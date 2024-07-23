import React, { useState, useEffect } from 'react';
import "./Home.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { db } from '../firebase-config';
import { collection, getDocs, updateDoc, doc, getDoc, addDoc, query, orderBy } from 'firebase/firestore';
import { serverTimestamp } from "firebase/firestore";

import { auth } from "../firebase-config";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userCollectionRef = collection(db, "itemlog");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [reloadAmount, setReloadAmount] = useState("");
  const [selectedReloadBtn, setSelectedReloadBtn] = useState(false);
  const [selectedReleaseBtn, setSelectedReleaseBtn] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState("");
  const [note, setNote] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const userEmail = auth.currentUser ? auth.currentUser.email : "";

  const handleClose = () => {
    setSelectedItem(null);
    setSelectedQuantity(null);
    setSelectedReloadBtn(false);
    setSelectedReleaseBtn(false);
  };

  const handleCloseSuccess = () => {
    setIsFormSubmitted(false);
  };

  const reload = (name, quantity, docId) => {
    setSelectedItem(name);
    setSelectedQuantity(quantity);
    setSelectedDocId(docId);
    setSelectedReloadBtn(true);
  };

  const release = (name, quantity, docId) => {
    setSelectedItem(name);
    setSelectedQuantity(quantity);
    setSelectedDocId(docId);
    setSelectedReleaseBtn(true);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(query(userCollectionRef, orderBy("createdAt", "desc")));
        setUsers(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [userCollectionRef]);

  const handleReload = async () => {
    if (reloadAmount !== "" && selectedItem) {
      const newCount = Number(selectedQuantity) + parseInt(reloadAmount);

      try {
        const docRef = doc(db, "itemlog", selectedDocId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          await updateDoc(docRef, {
            quantity: newCount
          });
          setIsFormSubmitted(true);
          handleClose();

          if (!isNaN(reloadAmount)) {
            await addDoc(collection(db, "records"), {
              name: selectedItem,
              quantity: reloadAmount,
              note: note,
              status: "reload",
              username: userEmail,
              createdAt: serverTimestamp()
            });

            setSuccessmsg("Data added successfully");
          }

          console.log("Document updated successfully!");
        } else {
          console.log("Document does not exist.");
        }
      } catch (error) {
        console.log("Error updating document:", error);
      }
    }
  };

  const handleRelease = async () => {
    if (reloadAmount !== "" && selectedItem) {
      const newCount = Number(selectedQuantity) - parseInt(reloadAmount);

      try {
        const docRef = doc(db, "itemlog", selectedDocId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          await updateDoc(docRef, {
            quantity: newCount
          });
          setIsFormSubmitted(true);
          handleClose();

          if (!isNaN(reloadAmount)) {
            await addDoc(collection(db, "records"), {
              name: selectedItem,
              quantity: reloadAmount,
              note: note,
              username: userEmail,
              status: "release",
              createdAt: serverTimestamp()
            });
            console.log(userEmail);

            setSuccessmsg("Data added successfully");
          }

          console.log("Document updated successfully!");
        } else {
          console.log("Document does not exist.");
        }
      } catch (error) {
        console.log("Error updating document:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={loading ? "visibleloader" : "hideloader"}></div>
      <div className={selectedReloadBtn || selectedReleaseBtn || isFormSubmitted ? "hmain-container": ""}></div>
      <div className='hheader'>ITUM Stationaries</div>
      <div className='test'>
        <div className="content">
          {users.map((user) => (
            <div key={user.id} className={user.quantity > user.minCount ? "hmain-box" : "hmain-less"}>
              <div className='htext-line'>
                <div className='hname'>{user.name}</div>
                <div className='hquantity'>{user.quantity}</div>
              </div>
              <div className='hbtns'>
                <div className="hreloadbtn" onClick={() => reload(user.name, user.quantity, user.id)}>reload</div>
                <div className="hreleasebtn" onClick={() => release(user.name, user.quantity, user.id)}>release</div>
              </div>
            </div>
            
          ))}
        </div>

      

     

        {selectedItem && selectedReloadBtn && (
          <div className='selected-item-reload'>

            <div className='hreload-upper'>
              <div className='hitem-name'>Item : {selectedItem} </div>
              <div className="hclosebtn" onClick={handleClose}>X</div>
            </div>

            <div className='hdata'>
              <div className='hdataname'>Quantity</div>
              <input onChange={(event) => { setReloadAmount(event.target.value) }}></input><br />
            </div>


            <div className='hdata'>
            <div className='hdataname'>Description</div>
              <input onChange={(event) => { setNote(event.target.value) }}></input><br />
            </div>
            <div className="hreloadnowbtn" onClick={handleReload}>Reload</div>
          </div>
        )}

        {/*{selectedItem && selectedReleaseBtn && (
          <div className='selected-item-release'>
            Selected item: {selectedItem}
            <button onClick={handleClose}>close</button><br />
            <label>amount</label>
            <input onChange={(event) => { setReloadAmount(event.target.value) }}></input><br />
            <label>Note</label>
            <input onChange={(event) => { setNote(event.target.value) }}></input><br />
            <button onClick={handleRelease}>release now</button>
          </div>
        )}*/}

        {selectedItem && selectedReleaseBtn&& (
          <div className='selected-item-release'>

            <div className='hreload-upper-re'>
              <div className='hitem-name-re'>Item : {selectedItem} </div>
              <div className="hclosebtn-re" onClick={handleClose}>X</div>
            </div>

            <div className='hdata-re'>
              <div className='hdataname-re'>Quantity</div>
              <input onChange={(event) => { setReloadAmount(event.target.value) }}></input><br />
            </div>


            <div className='hdata-re'>
            <div className='hdataname-re'>Description</div>
              <input onChange={(event) => { setNote(event.target.value) }}></input><br />
            </div>
            <div className="hreloadnowbtn-re" onClick={handleRelease}>Release</div>
          </div>
        )}



        {isFormSubmitted && (
          <div className="success-message">
            <div className='success-text'>Document updated successfully !</div>
            <div className='success-close' onClick={handleCloseSuccess}>X</div>
          </div>
        )}
      </div>

      
      <Footer />
    </>
  );
}

export default Home;
