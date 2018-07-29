'use strict'

const config = require('./config')
const Gitlab = require('./gitlab').Gitlab

/**
 * @param {Mozaik} mozaik
 */
module.exports = mozaik => {
    mozaik.loadApiConfig(config)

    const gitlab = new Gitlab(
        config.get('gitlab.baseUrl'),
        config.get('gitlab.token'),
        mozaik.request,
        mozaik.logger
    )

    return {
        project({ project }) {
            return gitlab.getProject(project)
        },
        projectMembers({ project }) {
            return Promise.all([
                gitlab.getProject(project),
                gitlab.getProjectMembers(project),
            ]).then(([project, members]) => ({
                project,
                members,
            }))
        },
        projectContributors({ project }) {
            return Promise.all([
                gitlab.getProject(project),
                gitlab.getProjectContributors(project),
            ]).then(([project, contributors]) => ({
                project,
                contributors,
            }))
        },
        projectJobs({ project }) {
            return Promise.all([gitlab.getProject(project), gitlab.getProjectJobs(project)]).then(
                ([project, jobs]) => ({
                    project,
                    jobs,
                })
            )
        },
        projectBranches({ project }) {
            return Promise.all([
                gitlab.getProject(project),
                gitlab.getProjectBranches(project),
            ]).then(([project, branches]) => ({
                project,
                branches,
            }))
        },
        projectMergeRequests({ project, query = {} }) {
            return gitlab.getProjectMergeRequests(project, query)
        },
        projectLabels({ project }) {
            return Promise.all([gitlab.getProject(project), gitlab.getProjectLabels(project)]).then(
                ([project, labels]) => ({
                    project,
                    labels,
                })
            )
        },
        projectMilestones({ project }) {
            return Promise.all([
                gitlab.getProject(project),
                gitlab.getProjectMilestones(project),
            ]).then(([project, milestones]) => ({
                project,
                milestones,
            }))
        },
        projectEvents({ project }) {
            return Promise.all([gitlab.getProject(project), gitlab.getProjectEvents(project)]).then(
                ([project, events]) => ({
                    project,
                    events,
                })
            )
        },
    }
}
