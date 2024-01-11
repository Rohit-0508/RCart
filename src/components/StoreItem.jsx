import { useShoppingCart } from "../context/ShoppingCartContext";
import {formatCurrency} from "../utilities/formatCurrency"
import { Button,Card } from "react-bootstrap";


export function StoreItem({id,name,Price,imgUrl}){
    const {getItemQuantity,increaseQuantity,decreaseQuantity,removeFromCart}=useShoppingCart()
    const quantity=getItemQuantity(id);
    return(
        <>
            <Card className="h-100">
                <Card.Img variant="top" src={imgUrl} alt="images" height="200px" style={{objectFit:"cover"}}/>
            
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                        <span className="fs-2">{name}</span>
                        <span className="ms-2 text-muted">{formatCurrency(Price)}</span>
                    </Card.Title>
                    <div className="mt-auto">
                        {!quantity ? (
                            <Button className="w-100" onClick={()=>increaseQuantity(id)}>
                                +Add To Cart
                            </Button>
                        ):(
                            <div className="d-flex align-items-center flex-column"
                            style={{gap:"0.5rem"}}>
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ gap: ".5rem" }}
                            >
                                <Button onClick={()=>decreaseQuantity(id)}>-</Button>
                                <div>
                                    <span className="fs-3">{quantity}</span>in cart
                                </div>
                                <Button onClick={()=>increaseQuantity(id)}>+</Button>
                            </div>
                        <Button onClick={()=>removeFromCart(id)} variant="danger" size="sm">Remove</Button>
                    </div>
                    )}
                </div>
                </Card.Body>
            </Card>
            
        </>
    )
}
