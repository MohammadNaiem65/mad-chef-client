import { chef, knife, pan, spoon } from '../../../assets';
import MotionImage from './MotionImage';

export default function RightSideContainer() {
    return (
        <section className='w-64 relative'>
            <MotionImage
                src={chef}
                alt='banner image'
                className='w-48 ml-10 mt-7'
            />
            <MotionImage
                delay={0.6}
                src={knife}
                alt='banner image'
                className='w-14 absolute top-14 right-6'
            />
            <MotionImage
                delay={0.5}
                src={pan}
                alt='banner image'
                className='w-16 absolute top-36 -left-2'
            />
            <MotionImage
                delay={0.2}
                src={spoon}
                alt='banner image'
                className='w-44 absolute bottom-7 right-6'
            />
        </section>
    );
}
