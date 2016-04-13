// Load environment variables from .env file if available
require('dotenv').load();


var gitlabProject = 'gitlab-org/gitlab-ce';


var config = {
    env:  'prod',

    host:             '0.0.0.0',
    port:             process.env.PORT || 5000,
    useWssConnection: process.env.USE_SSL === 'true',

    theme: 'harlequin',

    // clients configs
    api: {},

    // define duration between each dashboard rotation (ms)
    rotationDuration: 8000,

    // define the interval used by Mozaïk Bus to call registered APIs
    apisPollInterval: 100000,

    dashboards: [

        // first dashboard
        {
            // 4 x 3 dashboard
            columns: 3,
            rows:    3,
            widgets: [
                {
                    type: 'gitlab.project',
                    project: gitlabProject,
                    columns: 1, rows: 1,
                    x: 0, y: 0
                },
                {
                    type: 'gitlab.project_members',
                    project: gitlabProject,
                    columns: 1, rows: 1,
                    x: 1, y: 0
                },
                {
                    type: 'gitlab.merge_requests_gauge',
                    project: gitlabProject,
                    columns: 1, rows: 1,
                    x: 2, y: 0
                },
                {
                    type: 'gitlab.build_history',
                    project: gitlabProject,
                    columns: 1, rows: 1,
                    x: 0, y: 1
                },
                {
                    type: 'gitlab.branches',
                    project: gitlabProject,
                    columns: 1, rows: 1,
                    x: 1, y: 1
                },
                {
                    type: 'gitlab.branches',
                    project: gitlabProject,
                    columns: 1, rows: 1,
                    x: 2, y: 1
                },
                {
                    type: 'gitlab.project',
                    project: gitlabProject,
                    columns: 1, rows: 1,
                    x: 2, y: 2
                },
                {
                    type: 'gitlab.build_histogram',
                    project: gitlabProject,
                    columns: 2, rows: 1,
                    x: 0, y: 2
                }
            ]
        }
    ]
};


module.exports = config;
