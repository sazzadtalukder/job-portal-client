import React from 'react';
import { motion } from "motion/react"
import { easeInOut } from 'motion';
const Banner = () => {
    const transition = {
        duration: 2,
        delay: 0.5,
        ease: easeInOut,
        repeat: Infinity
      }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                <motion.img
                    animate={{y: [50,100,50]}}
                    transition={{duration: 4,repeat: Infinity}}
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    className="max-w-sm rounded-t-3xl rounded-br-3xl shadow-2xl" />
                    <motion.img
                    animate={{x: [100,150,100]}}
                    transition={{duration: 4,repeat: Infinity, }}
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    className="max-w-sm rounded-t-3xl rounded-br-3xl shadow-2xl" />
                </div> 
                <div className='flex-1'>
                    <motion.h1 
                    animate={{ x: 50 }}
                    transition={transition}
                
                    className="text-5xl font-bold">Box Office News!</motion.h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;