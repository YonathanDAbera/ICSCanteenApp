
import {Option,OptionList} from './SortProductsOptions'

export default function SortOrdersOptions({setSortPreferece,defaultValue}){


return(
<OptionList  defaultValue={defaultValue} name="sortProductBy" onChange={(e) => setSortPreferece(e.target.value)}>
<Option value="-createdAt" >Most Recent</Option>
<Option value="createdAt" >Older</Option>
<Option value="total" >Lower Price</Option>
<Option value="-total">Higher Price</Option>

</OptionList>

);

}