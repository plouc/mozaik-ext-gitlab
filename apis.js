'use strict'

module.exports = (Mozaik, configFile, config) => {
    Mozaik.registerApi('gitlab', require('@mozaik/ext-gitlab/client'))
}
