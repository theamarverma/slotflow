export default function ClassicLoader({ className }: { className?: string }) {
	return (
		<div
			className={`border-primary flex h-6 w-6 animate-spin items-center justify-center rounded-full border-4 border-t-transparent ${className}`}></div>
	);
}