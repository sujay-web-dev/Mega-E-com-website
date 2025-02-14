import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {

    function renderInputsByComponent(getControlItem) {
        let element = null;
        const value = formData[getControlItem.name] || ""

        switch (getControlItem.componentType) {
            case 'input':
                element = (<Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={value}
                    onChange={event => setFormData({
                        ...formData,
                        [getControlItem.name]: event.target.value,
                    })}
                />)
                break;

            case 'select':
                element = (<Select onValueChange={(value) => setFormData({
                    ...formData,
                    [getControlItem.name]:value
                })} value={value}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={getControlItem.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem.options &&
                                getControlItem.options > 0 ?
                                getControlItem.options.map((optionItem) => {
                                    return (
                                        <SelectItem key={optionItem.id} value={optionItem.id}>
                                            {optionItem.label}
                                        </SelectItem>
                                    )
                                }) : null
                        }
                    </SelectContent>
                </Select>)
                break;

            case 'textarea':
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value,
                        })}
                    />
                )
                break;

            default:
                element = <Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={value}
                    onChange={event => setFormData({
                        ...formData,
                        [getControlItem.name]: event.target.value,
                    })}
                />
                break;
        }

        return element
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {
                    formControls.map((controlItem) => {
                        return (
                            <div className='grid w-full gap-1.5' key={controlItem.name}>
                                <Label className='mb-1'>{controlItem.label}</Label>
                                {renderInputsByComponent(controlItem)}
                            </div>
                        )
                    })
                }
            </div>
            <Button type='submit' className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
        </form>
    )
}

export default CommonForm