import Project from './Project'
import ProjectDescription from './ProjectDescription'
import ProjectMembers from './ProjectMembers'
import ProjectContributors from './ProjectContributors'
import JobHistory from './JobHistory'
import JobHistogram from './JobHistogram'
import Branches from './Branches'
import ProjectActivity from './activity/ProjectActivity'
import ProjectMilestones from './ProjectMilestones'
import LatestProjectPipeline from './pipelines/LatestProjectPipeline'
import * as labels from './labels'

export default {
    Project,
    ProjectDescription,
    ProjectMembers,
    ProjectContributors,
    JobHistory,
    JobHistogram,
    Branches,
    ProjectActivity,
    ProjectMilestones,
    LatestProjectPipeline,
    ...labels,
}
