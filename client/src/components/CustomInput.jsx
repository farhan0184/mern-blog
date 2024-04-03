import { Input, Typography } from "@material-tailwind/react";


export default function CustomInput({register, name, placeholder, error, label, type}) {
    return (
        <div>
            <Typography variant="small" color="blue-gray" className="">
                {label} {error && <span className='text-red-600'>{error?.message}</span>}
            </Typography>
            <Input
            type={type}
                size="lg"
                name={name}
                placeholder={placeholder}
                {...register(name, { required: true })}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            />
        </div>
    )
}
