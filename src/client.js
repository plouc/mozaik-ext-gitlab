import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';
import chalk   from 'chalk';
import config  from './config';


/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {

    mozaik.loadApiConfig(config);

    const buildApiRequest = (path, params) => {
        const url = config.get('gitlab.baseUrl');
        const req = request.get(`${url}${path}`);

        const paramsDebug = params ? ` ${JSON.stringify(params)}` : '';
        mozaik.logger.info(chalk.yellow(`[gitlab] calling ${url}${path}${paramsDebug}`));

        if (params) {
            req.query(params);
        }

        req.set('PRIVATE-TOKEN', config.get('gitlab.token'));

        return req.promise();
    };

    const operations = {
        project({ project }) {
            return buildApiRequest(`/projects/${encodeURIComponent(project)}`)
                .then(res => res.body)
            ;
        },
        projectMembers({ project }) {
            return buildApiRequest(`/projects/${encodeURIComponent(project)}/members`)
                .then(res => res.body)
            ;
        },
        projectContributors({ project }) {
            return buildApiRequest(`/projects/${encodeURIComponent(project)}/repository/contributors`)
                .then(res => res.body)
            ;
        },
        projectBuilds({ project }) {
            return Promise.props({
                project: operations.project({ project }),
                builds:  buildApiRequest(`/projects/${encodeURIComponent(project)}/builds`).then(res => res.body)
            });
        },
        projectBranches({ project }) {
            return Promise.props({
                project:  operations.project({ project }),
                branches: buildApiRequest(`/projects/${encodeURIComponent(project)}/repository/branches`).then(res => res.body)
            });
        },
        projectMergeRequests({ project, query = {} }) {
            return buildApiRequest(`/projects/${encodeURIComponent(project)}/merge_requests`, query)
                .then(res => {
                    return {
                        total:   parseInt(res.header['x-total'], 10),
                        results: res.body
                    };
                })
            ;
        },
        projectsMergeRequests({ projects }) {
            const reqs = projects.map((project) => {
                return buildApiRequest(`/projects/${encodeURIComponent(project)}/merge_requests`);
            });
            return Promise.props({
                mergeRequests: Promise.all(reqs).then((data) => {
                    return data.map((item) => item.body);
                })
            });
        },
        groupMergeRequests({ groups, query={} }) {
            const reqs = groups.map((group) => {
                return buildApiRequest(`/groups/${encodeURIComponent(group)}/merge_requests`, query);
            });
            return Promise.props({
                mergeRequests: Promise.all(reqs).then((data) => {
                    return data.map((item) => item.body);
                })
            });
        },
        projectPipelines({ project, query={} }) {
            return Promise.props({
                project:   operations.project({ project }),
                pipelines: buildApiRequest(`/projects/${encodeURIComponent(project)}/pipelines`, query).then((res) => {
                    return res.body;
                })
            });
        },
    };

    return operations;
};


export default client;
