import Navbar from "@/components/Navbar"

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section>
            <div className="container mx-auto px-4 py-8">
                {children}
            </div>
        </section>
    )
}

export default ProductLayout
