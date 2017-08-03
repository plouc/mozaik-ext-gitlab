export const countByLabels = {
    open_issues_count: 'open issues',
    closed_issues_count: 'closed issues',
    open_merge_requests_count: 'opened merge requests',
}

export const countTypes = Object.keys(countByLabels)

export const countLabel = countType => countByLabels[countType]
