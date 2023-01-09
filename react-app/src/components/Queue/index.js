import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQueueThunk, emptyQueueThunk } from '../../store/queue'
import SideBar from '../Sidebar'
import Record from '../Record'
import './index.css'


const Queue = () => {
    const dispatch = useDispatch();
    const queue = useSelector((state) => Object.values(state.queue.queueTracks))

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(getQueueThunk())
                .then(() => setLoaded(true))
        })();
    }, [dispatch]);

    const handleQueueClear = () => {
        dispatch(emptyQueueThunk())
    }


    return (
        <>
            {loaded &&

                (<div className='fullview'>
                    <SideBar />

                    <div className='main-page-container'>
                        <div className='queue-container'>

                            <div className='queue-title'>Queue</div>

                            <div className='queue-button'>
                                <button className='queue-clear' onClick={handleQueueClear}>Clear Queue</button>
                            </div>

                            {!queue.length && (<div className='empty-queue'>Your Queue is Currently Empty</div>)}

                            {queue.map(track => (
                                <div className='track-record'>
                                    {track.tracks ? <Record track={track.tracks} /> :
                                        <Record track={track} />}

                                </div>
                            ))}


                        </div>
                    </div>
                </div>)
            }

        </>
    )

}

export default Queue;
