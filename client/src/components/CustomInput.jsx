import { Input, Typography } from "@material-tailwind/react";


export default function CustomInput({register, name, placeholder, error, label, type, disabled}) {

    return (
        <div>
            <Typography variant="small" color="blue-gray" className="dark:!text-white">
                {label} {error && <span className='text-red-600'>{error?.message}</span>}
            </Typography>
            <Input
            type={type}
                size="lg"
                name={name}
                
                placeholder={placeholder}
                {...register(name, { required: true })}
                className=" !border-blue-gray-200"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
                disabled={disabled}
            />
        </div>
    )
}
