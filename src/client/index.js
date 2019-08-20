'use strict'

const Gitlab = require('./gitlab').Gitlab

const aggregatePipelineJobs = jobs => {
    let stages = []
    jobs.forEach(job => {
        let stage = stages.find(s => s.name === job.stage)
        if (stage === undefined) {
            stage = {
                name: job.stage,
                jobs: [],
                status: 'success',
            }
            stages.push(stage)
        }

        stage.jobs.push(job)
    })

    stages = stages.map(stage => {
        let status
        stage.jobs.forEach(job => {
            if (job.status === 'failed') {
                status = 'failed'
            }
            if (status === undefined && job.status === 'success') {
                status = 'success'
            }
            if (status === undefined && job.status === 'manual') {
                status = 'skipped'
            }
        })

        if (status === undefined) {
            status = 'pending'
        }

        stage.status = status

        return stage
    })

    return stages
}

const clients = {}

const getClient = (mozaik, id = 'default') => {
    if (clients[id] !== undefined) return clients[id]

    let envPrefix = 'GITLAB_'
    if (id !== 'default') {
        envPrefix += id.toUpperCase() + '_'
    }

    let options = {
        baseUrl: process.env[envPrefix + 'BASE_URL'],
        token: process.env[envPrefix + 'API_TOKEN'],
    }

    let client = new Gitlab(options.baseUrl, options.token, mozaik.request, mozaik.logger)
    clients[id] = client

    return client
}

/**
 * @param {Mozaik} mozaik
 */
module.exports = mozaik => {
    return {
        project({ project, client }) {
            const gitlab = getClient(mozaik, client)
            return gitlab.getProject(project)
        },
        projectMembers({ project, client }) {
            const gitlab = getClient(mozaik, client)
            return Promise.all([
                gitlab.getProject(project),
                gitlab.getProjectMembers(project),
            ]).then(([project, members]) => ({
                project,
                members,
            }))
        },
        projectContributors({ project, client }) {
            const gitlab = getClient(mozaik, client)
            return Promise.all([
                gitlab.getProject(project),
                gitlab.getProjectContributors(project),
            ]).then(([project, contributors]) => ({
                project,
                contributors,
            }))
        },
        projectJobs({ project, client }) {
            const gitlab = getClient(mozaik, client)
            return Promise.all([gitlab.getProject(project), gitlab.getProjectJobs(project)]).then(
                ([project, jobs]) => ({
                    project,
                    jobs,
                })
            )
        },
        projectBranches({ project, client }) {
            const gitlab = getClient(mozaik, client)
            return Promise.all([
                gitlab.getProject(project),
                gitlab.getProjectBranches(project),
            ]).then(([project, branches]) => ({
                project,
                branches,
            }))
        },
        projectMergeRequests({ project, query = {}, client }) {
            const gitlab = getClient(mozaik, client)
            return gitlab.getProjectMergeRequests(project, query)
        },
        projectLabels({ project, client }) {
            const gitlab = getClient(mozaik, client)
            return Promise.all([gitlab.getProject(project), gitlab.getProjectLabels(project)]).then(
                ([project, labels]) => ({
                    project,
                    labels,
                })
            )
        },
        projectMilestones({ project, client }) {
            const gitlab = getClient(mozaik, client)
            return Promise.all([
                gitlab.getProject(project),
                gitlab.getProjectMilestones(project),
            ]).then(([project, milestones]) => ({
                project,
                milestones,
            }))
        },
        projectEvents({ project, client }) {
            const gitlab = getClient(mozaik, client)
            return Promise.all([gitlab.getProject(project), gitlab.getProjectEvents(project)]).then(
                ([project, events]) => ({
                    project,
                    events,
                })
            )
        },
        latestProjectPipeline({ project, ref, client }) {
            const gitlab = getClient(mozaik, client)
            return gitlab.getProjectPipelines(project, { ref, per_page: 1 }).then(({ items }) => {
                if (items.length === 0) return null

                return Promise.all([
                    gitlab.getProject(project),
                    gitlab.getProjectPipeline(project, items[0].id),
                    gitlab.getProjectPipelineJobs(project, items[0].id, { per_page: 100 }),
                ]).then(([project, pipeline, jobs]) => {
                    let commit
                    if (jobs.items.length > 0) {
                        commit = jobs.items[0].commit
                    }

                    return {
                        ...pipeline,
                        project,
                        commit,
                        stages: aggregatePipelineJobs(jobs.items),
                    }
                })
            })
        },
    }
}
