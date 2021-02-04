export const TableTextFilters = ({
    column: { filterValue, preFilteredRows, setFilter },
}, placeholder) => {
    return (
        <input
            className = 'form-control'
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={placeholder}
        />
    )
}
