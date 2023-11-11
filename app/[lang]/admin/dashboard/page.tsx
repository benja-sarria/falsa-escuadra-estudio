import { AdminMainContentComponent } from "@/components/AdminMainContentcomponent/AdminMainContentComponent";
import MiniDrawerComponent from "@/components/MiniDrawerComponent/MiniDrawerComponent";
import { AppBarContainer } from "@/containers/AppBarContainer/AppBarContainer";
import { MiniDrawerContainer } from "@/containers/MiniDrawerContainer/MiniDrawerContainer";
import { ProductDetailContainer } from "@/containers/ProductDetailContainer/ProductDetailContainer";
import { ProductsSectionContainer } from "@/containers/ProductsSectionContainer/ProductsSectionContainer";

export default async function Admin() {
    return (
        <div>
            <MiniDrawerContainer>
                <AdminMainContentComponent>
                    <ProductsSectionContainer />
                    <ProductDetailContainer />
                </AdminMainContentComponent>
            </MiniDrawerContainer>
        </div>
    );
}
