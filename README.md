# Mozaïk GitLab widgets

[![License][license-image]][license-url]
[![Travis CI][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Dependencies][gemnasium-image]][gemnasium-url]
[![Coverage Status][coverage-image]][coverage-url]
![widget count][widget-count-image]

## Demo

You can see a live demo of the widgets [here](http://mozaik-gitlab.herokuapp.com/)

## Widgets


### GitLab Branches

> Show GitLab project branches.

![Gitlab project branches](https://raw.githubusercontent.com/plouc/mozaik-ext-gitlab/master/preview/gitlab_branches.png)

#### parameters

key       | required | description
----------|----------|--------------------------
`project` | yes      | *ID or NAMESPACE/PROJECT_NAME of a project*

#### usage

```javascript
{
  type: 'gitlab.branches',
  project: 'gitlab-org/gitlab-ce',
  columns: 1, rows: 1, x: 0, y: 0
}
```


### GitLab Build Histogram

> Show GitLab project build histogram.

![Gitlab project build histogram](https://raw.githubusercontent.com/plouc/mozaik-ext-gitlab/master/preview/gitlab_build_histogram.png)

#### parameters

key       | required | description
----------|----------|--------------------------
`project` | yes      | *ID or NAMESPACE/PROJECT_NAME of a project*

#### usage

```javascript
{
  type: 'gitlab.build_histogram',
  project: 'gitlab-org/gitlab-ce',
  columns: 1, rows: 1, x: 0, y: 0
}
```


### GitLab Build History

> Show GitLab project build history.

![Gitlab project build history](https://raw.githubusercontent.com/plouc/mozaik-ext-gitlab/master/preview/gitlab_build_history.png)

#### parameters

key       | required | description
----------|----------|--------------------------
`project` | yes      | *ID or NAMESPACE/PROJECT_NAME of a project*

#### usage

```javascript
{
  type: 'gitlab.build_history',
  project: 'gitlab-org/gitlab-ce',
  columns: 1, rows: 1, x: 0, y: 0
}
```


### GitLab Members

> Show GitLab project members.

![Gitlab project members](https://raw.githubusercontent.com/plouc/mozaik-ext-gitlab/master/preview/gitlab_members.png)

#### parameters

key       | required | description
----------|----------|--------------------------
`project` | yes      | *ID or NAMESPACE/PROJECT_NAME of a project*

#### usage

```javascript
{
  type: 'gitlab.members',
  project: 'gitlab-org/gitlab-ce',
  columns: 1, rows: 1, x: 0, y: 0
}
```


### GitLab Merge Requests Gauge

> Show GitLab project merge requests gauge.

![Gitlab project merge requests gauge](https://raw.githubusercontent.com/plouc/mozaik-ext-gitlab/master/preview/gitlab_merge_requests_gauge.png)

#### parameters

key       | required | description
----------|----------|--------------------------
`project` | yes      | *ID or NAMESPACE/PROJECT_NAME of a project*

#### usage

```javascript
{
  type: 'gitlab.merge_requests_gauge',
  project: 'gitlab-org/gitlab-ce',
  columns: 1, rows: 1, x: 0, y: 0
}
```


[license-image]: https://img.shields.io/github/license/plouc/mozaik-ext-gitlab.svg?style=flat-square
[license-url]: https://github.com/plouc/mozaik-ext-gitlab/blob/master/LICENSE.md
[travis-image]: https://img.shields.io/travis/plouc/mozaik-ext-gitlab.svg?style=flat-square
[travis-url]: https://travis-ci.org/plouc/mozaik-ext-gitlab
[npm-image]: https://img.shields.io/npm/v/mozaik-ext-gitlab.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/mozaik-ext-gitlab
[gemnasium-image]: https://img.shields.io/gemnasium/plouc/mozaik-ext-gitlab.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/plouc/mozaik-ext-gitlab
[coverage-image]: https://img.shields.io/coveralls/plouc/mozaik-ext-gitlab.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/plouc/mozaik-ext-gitlab
[widget-count-image]: https://img.shields.io/badge/widgets-x0-green.svg?style=flat-square
