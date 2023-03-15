import { useState } from 'react'

 const UseForm = (initial = {}, onValidate) => {
    const [inputs, setInputs] = useState(initial);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        let { name, type, value, checked } = e.target;

        if (type === "checkbox") value = checked;
        
        if (type === "number") value = parseInt(value);

        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    } 

    const handleSubmit = () => {
        let confirm = false;
        const err = onValidate(inputs)
        setErrors(err);
        console.log('cadena',Object.keys(err).length);

        if(Object.keys(err).length === 0){
            confirm = true            
        }

        return confirm
    }
    
    const clearForm = () => {
        setErrors(false);
        //Convertimos los inputs (json) a un arreglo de arreglos 
        const inputsArray = Object.entries(inputs);

        // Recorremos el arreglo y retornamos un nuevo arreglo de arreglos conservando el key
        const clearInputsArray = inputsArray.map(([key]) => [key, '']);

        //Convertimos el arreglo de arreglos nuevamente a formato json
        const inputsJson = Object.fromEntries(clearInputsArray);

        setInputs(inputsJson);
    }

    const resetForm = () => {
        setInputs(initial);
    }

    return {
        inputs,
        setInputs,
        errors,
        loading,
        setLoading,
        handleChange,
        handleSubmit,
        clearForm
    }
}

export default UseForm;