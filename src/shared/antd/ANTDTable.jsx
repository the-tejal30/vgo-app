import { Table } from 'antd'


const ANTDTable = ({ pagination, ...props }) => {
  return (
    <Table
      {...props}
      pagination={pagination && { showSizeChanger: false, ...pagination }}
      locale={{ emptyText: "No Data" }}
    />
  );
};

export default ANTDTable

const ANTDTableRow = ({ ...props }) => {
  return <Table.Summary.Row {...props} />
}
const ANTDTableCell = ({ ...props }) => {
  return <Table.Summary.Cell {...props} />
}
export { ANTDTableRow, ANTDTableCell }
