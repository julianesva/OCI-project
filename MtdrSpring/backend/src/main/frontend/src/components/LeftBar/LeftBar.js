import './LeftBar.css'
import { useState } from 'react'
import LeftBarArrow from './LeftBarArrow/LeftBarArrow'

export default function LeftBar() {
    const [isLeftBarHidden, setIsLeftBarHidden] = useState(false)

    return (
        <div className='leftbar-main'>
            {/* LeftBar Arrow Button */}
            <LeftBarArrow isLeftBarHidden={isLeftBarHidden} setIsLeftBarHidden={setIsLeftBarHidden} />

            {/* LeftBar Container */}
            {isLeftBarHidden ?
                <div className='leftbar-container'>
                    {/* LeftBar links */}
                    <div className='leftbar-links-container'>
                        <div className='leftbar-links-text-container'>
                            <button>
                                <p className='leftbar-links-text'>View my Teams</p>
                            </button>

                            <button>
                                <p className='leftbar-links-text'>Dashboard</p>
                            </button>

                            <button>
                                <p className='leftbar-links-text'>Quality</p>
                            </button>
                            
                            <button>
                                <p className='leftbar-links-text'>Design</p>
                            </button>
                            
                            <button>
                                <p className='leftbar-links-text'>Bugs</p>
                            </button>
                            
                            <button>
                                <p className='leftbar-links-text'>Releases</p>
                            </button>
                        </div>

                        <div className='leftbar-links-text-container'>
                            <button>
                                <p className='leftbar-links-text'>Settings</p>
                            </button>
                        </div>
                    </div>

                    {/* LeftBar Arrow Button */}
                    <LeftBarArrow isLeftBarHidden={isLeftBarHidden} setIsLeftBarHidden={setIsLeftBarHidden} />
                </div>
            : null}
        </div>
    )
}