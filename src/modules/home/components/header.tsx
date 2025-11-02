import Image from 'next/image'
import Link from 'next/link'
import NavItems from './nav-items';
import UseDropDown from './use-drop-down';
import { UserButton } from '@clerk/nextjs';

const Header = () => {
    return (
        <header className='sticky top-0 header'>
            <div className='container header-wrapper'>
                <Link href={'/'}>
                    <Image src={'/assets/icons/logo.svg'} alt='Insane Logo' width={148} height={32} />
                </Link>
                <nav className='hidden sm:block'>
                    <NavItems />
                </nav>
                <div className='flex gap-1'>
                    <UserButton />
                    <UseDropDown />
                </div>
            </div>
        </header>
    )
}

export default Header;