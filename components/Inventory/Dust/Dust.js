import Modal from "../../Reactstrap/Modal";
import "../Item/style.scss";
const Dust = ({ itemComponent, src }) => {
  const item = src == "inventory" ? itemComponent.item_info : itemComponent;
  return (
    <div>
      <Modal
        title={item.name}
        trigger={
          <div className="item">
            <img src={`http://localhost:1337${item.image[0].url}`} />
            <div className="item--name"> {item.name}</div>

            <div className="item--quantity">
              {itemComponent.quantity || itemComponent.quantity == 0
                ? itemComponent.quantity
                : 1}
            </div>
          </div>
        }
      >
        <div className="item--modal">
          <div className="item--modal__image">
            <img src={`http://localhost:1337${item.image[0].url}`} />
          </div>
          <div className="pt1">
            <h6>Dropped by: </h6>
            {/* {item.description} realm specific*/}
          </div>
          <div className="pt1">
            <h6>Used for: </h6>
            {/* {item.description} crafting items?*/}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dust;
