const convict = require('convict')

const config = convict({
    gitlab: {
        baseUrl: {
            doc: 'The gitlab API base url.',
            default: 'https://gitlab.com/api/v3',
            format: String,
            env: 'GITLAB_BASE_URL',
        },
        token: {
            doc: 'The gitlab API token.',
            default: null,
            format: String,
            env: 'GITLAB_API_TOKEN',
        },
    },
})

module.exports = config
