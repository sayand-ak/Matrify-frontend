import { ColorRing } from 'react-loader-spinner';


export function Loader({dimension}:{dimension: number}) {
    return (
        <ColorRing
            visible={true}
            height={dimension}
            width={dimension}
            ariaLabel="color-ring-loading"
            wrapperClass="color-ring-wrapper"
            colors={['#C2A170', '#C2A170', '#C2A170', '#C2A170', '#C2A170']}
        />
    )
}