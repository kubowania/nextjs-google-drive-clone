import Image from "next/image"

const Header = () => {
    return (
        <header>
            <Image 
                src="/drive_logo.png"
                alt="Drive Logo"
                width={50}
                height={50}
            />
            <h1>Drive</h1>
        </header>
    )
}
export default Header