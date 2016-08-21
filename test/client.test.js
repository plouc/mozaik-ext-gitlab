import test      from 'ava'
import nock      from 'nock'
import sinon     from 'sinon'
import mockery   from 'mockery'
import chalkMock from './chalk-mock'


let client

const gitlabBaseUrl = 'https://gitlab.test'
const gitlabToken   = 'secret_token'

test.before('before', t => {
    mockery.enable({
        warnOnUnregistered: false
    })

    mockery.registerMock('chalk', chalkMock)
    mockery.registerMock('./config', {
        get: configKey => {
            if (configKey === 'gitlab.baseUrl') {
                return gitlabBaseUrl
            } else if (configKey === 'gitlab.token') {
                return gitlabToken
            }

            throw new Error(`Invalid config key '${configKey}'`)
        }
    })
})

test.beforeEach('beforeEach', t => {
    const mozaik = {
        loadApiConfig: () => {},
        logger:        {
            info:  sinon.spy(),
            error: sinon.spy(),
        },
    }

    t.context = {
        client: require('../src/client')(mozaik),
        mozaik,
    }
})

test.after('after', t => {
    mockery.deregisterAll()
})


test('project', t => {
    const { client, mozaik } = t.context

    const project       = 'mozaik'
    const sampleProject = { project }

    nock(gitlabBaseUrl)
        .get(`/projects/${project}`)
        .reply(200, sampleProject)
    

    return client.project({ project })
        .then(projectData => {
            t.deepEqual(projectData, sampleProject)
            t.truthy(mozaik.logger.info.calledOnce)
            t.is(mozaik.logger.info.getCall(0).args[0], `[gitlab] calling ${gitlabBaseUrl}/projects/${project}`)
        })
    
})
