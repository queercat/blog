import Link from 'next/link'

export default function Header() {
    return (
        <div className="header">
            <div className='header-items'>
                <div className='header-item'>
                    <Link href="/"><h1>may</h1></Link>
                    <h1>-</h1>
                </div>

                <div className='header-item'>
                    <Link href="/blog"><h1>blog</h1></Link>
                    <h1>-</h1>
                </div>

                <div className='header-item'>
                    <Link href="/resume"><h1>resume</h1></Link>
                </div>
            </div>
            <p>====================</p>
        </div>
    )
}