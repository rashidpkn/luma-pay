import Hero from "./sections/Hero"
import Steps from "./sections/Steps"
import Visibility from "./sections/Visibility"
import OneApp from "./sections/OneApp"
import Sustainability from "./sections/Sustainability"

export default function HomePage() {
    return (
        <div>
            <Hero />
            <Steps />
            <Visibility />
            <OneApp />
            <Sustainability />
        </div>
    )
}