import { Select } from 'antd'


function ANTDSelect({ notFoundContent, ...props }) {
  return <Select {...props} notFoundContent={notFoundContent || "No Data"} />;
}
export default ANTDSelect
