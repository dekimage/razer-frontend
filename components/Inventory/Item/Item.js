import Link from "next/link";
import Modal from "../../Reactstrap/Modal";
import "./style.scss";
const Item = ({ item, type }) => {
  return (
    <div>
      <Modal
        title={item.name}
        trigger={
          <div className="item">
            <img src={`http://localhost:1337${item.image[0].url}`} />
            <div className="item--name"> {item.name}</div>
            <div className="item--quantity">1</div>
          </div>
        }
      >
        <div className="item--modal">
          <div className="item--modal__image">
            <img src={`http://localhost:1337${item.image[0].url}`} />
          </div>
          <div className="pt1">
            <h6>Item Description:</h6>
            <div className="item--modal__description">{item.description}</div>
          </div>

          {type === "key" && (
            <div className="pt1">
              <h6>Obtained by Expansion:</h6>
              <Link href={`/expansion/${item.expansion.id}`}>
                <div className="item--modal__cardLink">
                  {item.expansion.name}
                </div>
              </Link>
            </div>
          )}

          <div className="pt1">
            <h6>Required for cards:</h6>
            {item[type === "item" ? "locks_cards" : "cards"].map((c, i) => (
              <Link href={`/card/${c.id}`} key={i}>
                <div className="item--modal__cardLink">{c.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Item;
