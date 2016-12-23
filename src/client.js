const request = require('superagent-bluebird-promise')
const Promise = require('bluebird')
const chalk   = require('chalk')
const config  = require('./config')


/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {

    mozaik.loadApiConfig(config)

    const buildApiRequest = (path, params) => {
        const url = config.get('gitlab.baseUrl')
        const req = request.get(`${url}${path}`)

        const paramsDebug = params ? ` ${JSON.stringify(params)}` : ''
        mozaik.logger.info(chalk.yellow(`[gitlab] calling ${url}${path}${paramsDebug}`))

        if (params) {
            req.query(params)
        }

        req.set('PRIVATE-TOKEN', config.get('gitlab.token'))

        return req.promise()
    }

    const operations = {
        project({ project }) {
            return buildApiRequest(`/projects/${encodeURIComponent(project)}`)
                .then(res => res.body)
            
        },
        projectMembers({ project }) {
            return Promise.props({
                project: operations.project({ project }),
                members: buildApiRequest(`/projects/${encodeURIComponent(project)}/members`).then(res => res.body),
            })
        },
        projectContributors({ project }) {
            return Promise.props({
                project:      operations.project({ project }),
                contributors: buildApiRequest(`/projects/${encodeURIComponent(project)}/repository/contributors`).then(res => res.body),
            })
        },
        projectBuilds({ project }) {
            return Promise.props({
                project: operations.project({ project }),
                builds:  buildApiRequest(`/projects/${encodeURIComponent(project)}/builds?per_page=40`).then(res => res.body),
            })
        },
        projectBranches({ project }) {
            return Promise.props({
                project:  operations.project({ project }),
                branches: buildApiRequest(`/projects/${encodeURIComponent(project)}/repository/branches`).then(res => res.body),
            })
        },
        projectMergeRequests({ project, query = {} }) {
            return buildApiRequest(`/projects/${encodeURIComponent(project)}/merge_requests`, query)
                .then(res => {
                    return {
                        total:   parseInt(res.header['x-total'], 10),
                        results: res.body
                    }
                })
            
        }
    }

    return operations
}


module.exports = client
