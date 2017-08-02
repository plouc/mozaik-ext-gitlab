# Mozaïk GitLab widgets

[![License][license-image]][license-url]
[![Travis CI][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Dependencies][gemnasium-image]][gemnasium-url]
[![Coverage Status][coverage-image]][coverage-url]
![widget count][widget-count-image]

[![Deploy][heroku-image]][heroku-url]

> This branch contains code for the version compatible with
> Mozaïk v2, if you're looking for v1, please use
> [mozaik-1 branch](https://github.com/plouc/mozaik-ext-gitlab/tree/mozaik-1).

This repository contains some widgets to use with [Mozaïk](https://github.com/plouc/mozaik).

## Demo

You can see a live demo of the widgets [here](http://mozaik-gitlab.herokuapp.com/)

## Widgets

- [Branches](#gitlab-branches)
- [Build Histogram](#gitlab-build-histogram)
- [Build History](#gitlab-build-history)
- [Project Members](#gitlab-project-members)
- [Project Contributors](#gitlab-project-contributors)
- [Project](#gitlab-project)


### GitLab Branches

> Show GitLab project branches.

![Gitlab project branches](https://raw.githubusercontent.com/plouc/mozaik-ext-gitlab/master/preview/gitlab_branches.png)

#### parameters

key       | required | description
----------|----------|--------------------------
`project` | yes      | *ID or NAMESPACE/PROJECT_NAME of a project*

#### usage

``` yaml
# config.yml
dashboards:
- # …
  widgets:
  - extension: gitlab
    widget:    Branches
    project:   gitlab-org/gitlab-ce
    columns:   1
    rows:      1
    x:         0
    y:         0
```


### GitLab Build Histogram

> Show GitLab project build histogram.

![Gitlab project build histogram](https://raw.githubusercontent.com/plouc/mozaik-ext-gitlab/master/preview/gitlab_build_histogram.png)

#### parameters

key       | required | description
----------|----------|--------------------------
`project` | yes      | *ID or NAMESPACE/PROJECT_NAME of a project*

#### usage

``` yaml
# config.yml
dashboards:
- # …
  widgets:
  - extension: gitlab
    widget:    BuildHistogram
    project:   gitlab-org/gitlab-ce
    columns:   2
    rows:      1
    x:         0
    y:         0
```


### GitLab Build History

> Show GitLab project build history.

![Gitlab project build history](https://raw.githubusercontent.com/plouc/mozaik-ext-gitlab/master/preview/gitlab_build_history.png)

#### parameters

key       | required | description
----------|----------|--------------------------
`project` | yes      | *ID or NAMESPACE/PROJECT_NAME of a project*

#### usage

``` yaml
# config.yml
dashboards:
- # …
  widgets:
  - extension: gitlab
    widget:    BuildHistory
    project:   gitlab-org/gitlab-ce
    columns:   1
    rows:      1
    x:         0
    y:         0
```


### GitLab Project Members

> Show GitLab project members.

![Gitlab project members](https://raw.githubusercontent.com/plouc/mozaik-ext-gitlab/master/preview/gitlab_members.png)

#### parameters

key       | required | description
----------|----------|--------------------------
`project` | yes      | *ID or NAMESPACE/PROJECT_NAME of a project*

#### usage

``` yaml
# config.yml
dashboards:
- # …
  widgets:
  - extension: gitlab
    widget:    ProjectMembers
    project:   gitlab-org/gitlab-ce
    columns:   1
    rows:      1
    x:         0
    y:         0
```


### GitLab Project Contributors

> Show GitLab project contributors.

![Gitlab project contributors](https://raw.githubusercontent.com/plouc/mozaik-ext-gitlab/master/preview/gitlab_project_contributors.png)

#### parameters

key       | required | description
----------|----------|--------------------------
`project` | yes      | *ID or NAMESPACE/PROJECT_NAME of a project*

#### usage

``` yaml
# config.yml
dashboards:
- # …
  widgets:
  - extension: gitlab
    widget:    ProjectContributors
    project:   gitlab-org/gitlab-ce
    columns:   1
    rows:      1
    x:         0
    y:         0
```


### GitLab Project

> Show GitLab project info.

![Gitlab project](https://raw.githubusercontent.com/plouc/mozaik-ext-gitlab/master/preview/gitlab_project.png)

#### parameters

key       | required | description
----------|----------|--------------------------
`project` | yes      | *ID or NAMESPACE/PROJECT_NAME of a project*

#### usage

``` yaml
# config.yml
dashboards:
- # …
  widgets:
  - extension: gitlab
    widget:    Project
    project:   gitlab-org/gitlab-ce
    columns:   1
    rows:      1
    x:         0
    y:         0
```


[license-image]: https://img.shields.io/github/license/plouc/mozaik-ext-gitlab.svg?style=flat-square
[license-url]: https://github.com/plouc/mozaik-ext-gitlab/blob/master/LICENSE.md
[travis-image]: https://img.shields.io/travis/plouc/mozaik-ext-gitlab.svg?style=flat-square
[travis-url]: https://travis-ci.org/plouc/mozaik-ext-gitlab
[npm-image]: https://img.shields.io/npm/v/@mozaik/ext-gitlab.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@mozaik/ext-gitlab
[gemnasium-image]: https://img.shields.io/gemnasium/plouc/mozaik-ext-gitlab.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/plouc/mozaik-ext-gitlab
[coverage-image]: https://img.shields.io/coveralls/plouc/mozaik-ext-gitlab.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/plouc/mozaik-ext-gitlab
[widget-count-image]: https://img.shields.io/badge/widgets-x6-green.svg?style=flat-square
[heroku-image]: https://www.herokucdn.com/deploy/button.svg
[heroku-url]: https://heroku.com/deploy?template=https://github.com/plouc/mozaik-ext-gitlab/tree/demo
