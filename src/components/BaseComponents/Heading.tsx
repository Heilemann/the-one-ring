type Props = React.HTMLAttributes<HTMLHeadingElement>

const Heading = ({ children, ...props }: Props) => {
	return (
		<h2 className='mt-6 text-lg font-bold' {...props}>
			{children}
		</h2>
	)
}

export default Heading
