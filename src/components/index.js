import Project from './Project'
import ProjectMembers from './ProjectMembers'
import ProjectContributors from './ProjectContributors'
import JobHistory from './JobHistory'
import JobHistogram from './JobHistogram'
import Branches from './Branches'
//import MergeRequestsGauge  from './MergeRequestsGauge'
import * as labels from './labels'

export default {
    Project,
    ProjectMembers,
    ProjectContributors,
    JobHistory,
    JobHistogram,
    Branches,
    //MergeRequestsGauge,
    ...labels,
}
