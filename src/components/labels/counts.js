export const labelByCountType = {
    open_issues_count: 'open issues',
    closed_issues_count: 'closed issues',
    open_merge_requests_count: 'opened merge requests',
}

export const countTypes = Object.keys(labelByCountType)

export const countLabel = countType => labelByCountType[countType]
