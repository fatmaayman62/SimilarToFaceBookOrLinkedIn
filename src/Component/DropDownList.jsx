import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
 
function DropDownList({deleteFunction,identifyEdit}) {


  return (
      <Dropdown>
      <DropdownTrigger>
         <svg className="w-16 outline-0 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
      </DropdownTrigger>
      <DropdownMenu aria-label="Action event example" onAction={(key) => alert(key)}> 
        <DropdownItem key="edit" onClick={(e)=>{identifyEdit();}}>Edit</DropdownItem>
        <DropdownItem onClick={()=>deleteFunction()} key="delete" className="text-danger" color="danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropDownList