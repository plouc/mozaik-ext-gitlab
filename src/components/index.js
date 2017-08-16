import Project from './Project'
import ProjectMembers from './ProjectMembers'
import ProjectContributors from './ProjectContributors'
import BuildHistory from './BuildHistory'
import BuildHistogram from './BuildHistogram'
import Branches from './Branches'
//import MergeRequestsGauge  from './MergeRequestsGauge'
import * as labels from './labels'

export default {
    Project,
    ProjectMembers,
    ProjectContributors,
    BuildHistory,
    BuildHistogram,
    Branches,
    //MergeRequestsGauge,
    ...labels,
}
