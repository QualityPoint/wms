
export interface AdditionalBuyerIDs{
	name: string
	creation: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Type Name : Data	*/
	type_name?: string
	/**	Type Code : Data	*/
	type_code?: string
	/**	Value : Data	*/
	value?: string
}