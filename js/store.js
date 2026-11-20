const BIGI_PRODUCTS=[
{id:"ip11-64",category:"phones",name:"iPhone 11",detail:"64GB • UK Used",condition:"UK Used",price:"₦240,000",art:"phone"},
{id:"ip12-128",category:"phones",name:"iPhone 12",detail:"128GB • UK Used",condition:"UK Used",price:"₦305,000",art:"phone"},
{id:"ip13-128",category:"phones",name:"iPhone 13",detail:"128GB • UK Used",condition:"UK Used",price:"₦375,000",art:"phone"},
{id:"ip14-128",category:"phones",name:"iPhone 14",detail:"128GB • UK Used",condition:"UK Used",price:"₦450,000",art:"phone"},
{id:"ip15-128",category:"phones",name:"iPhone 15",detail:"128GB • UK Used",condition:"UK Used",price:"₦610,000",art:"phone"},
{id:"s21-128",category:"phones",name:"Samsung Galaxy S21",detail:"128GB • UK Used",condition:"UK Used",price:"₦255,000",art:"phone"},
{id:"s22-128",category:"phones",name:"Samsung Galaxy S22",detail:"128GB • UK Used",condition:"UK Used",price:"₦275,000",art:"phone"},
{id:"s23-256",category:"phones",name:"Samsung Galaxy S23",detail:"256GB • UK Used",condition:"UK Used",price:"₦400,000",art:"phone"},
{id:"hp840",category:"computers",name:"HP EliteBook 840",detail:"Core i5 • SSD • Laptop",condition:"Ask for condition",price:"₦220,000–₦510,000",art:"laptop"},
{id:"dell7420",category:"computers",name:"Dell Latitude 7420",detail:"Core i7 • SSD • Laptop",condition:"Ask for condition",price:"₦360,000–₦410,000",art:"laptop"},
{id:"mba-m1",category:"computers",name:"MacBook Air M1",detail:"Apple Silicon • Laptop",condition:"Ask for condition",price:"From ₦529,700",art:"laptop"},
{id:"ipad9",category:"tablets",name:"iPad 9th Generation",detail:"Wi-Fi • Tablet",condition:"Ask for condition",price:"Price on request",art:"tablet"},
{id:"ipad10",category:"tablets",name:"iPad 10th Generation",detail:"Wi-Fi • Tablet",condition:"Ask for condition",price:"₦350,000–₦450,000",art:"tablet"},
{id:"tab-s8",category:"tablets",name:"Samsung Galaxy Tab S8",detail:"Galaxy Tablet",condition:"Ask for condition",price:"₦450,000–₦490,000",art:"tablet"}
];
const BIGI_CART_KEY="bigi-gadgets-cart-v1";
function bigiGetCart(){try{return JSON.parse(localStorage.getItem(BIGI_CART_KEY)||"[]")}catch(error){return []}}
function bigiSaveCart(cart){localStorage.setItem(BIGI_CART_KEY,JSON.stringify(cart));bigiUpdateCartCount()}
function bigiUpdateCartCount(){const count=bigiGetCart().reduce((sum,item)=>sum+item.qty,0);document.querySelectorAll("[data-cart-count],#cartCount").forEach(el=>el.textContent=count)}
function bigiAddToCart(id){const product=BIGI_PRODUCTS.find(p=>p.id===id);if(!product)return;const cart=bigiGetCart();const item=cart.find(p=>p.id===id);if(item)item.qty+=1;else cart.push({id,qty:1});bigiSaveCart(cart);const toast=document.getElementById("toastMessage");if(toast){toast.querySelector("span").textContent=product.name+" added to cart";toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1800)}}
function bigiCard(p){
 const photos={
  "ip11-64":"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=700",
  "ip12-128":"https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=700",
  "ip13-128":"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=700",
  "ip14-128":"https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=700",
  "ip15-128":"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=700",
  "s21-128":"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=700",
  "s22-128":"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=700",
  "s23-256":"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",
  "hp840":"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",
  "dell7420":"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700",
  "mba-m1":"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700",
  "ipad9":"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700",
  "ipad10":"https://images.unsplash.com/photo-1561154464-82e9adf32764?w=700",
  "tab-s8":"https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=700"
 };
 const photo=photos[p.id]||"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700";
 return '<div class="col-6 col-lg-4 col-xl-3"><article class="product-card store-product"><div class="store-product-art"><img src="'+photo+'" alt="'+p.name+'" loading="lazy"><span class="store-condition">'+p.condition+'</span></div><div class="product-details"><span class="product-type">'+p.category.toUpperCase()+' / '+p.id.toUpperCase()+'</span><h3>'+p.name+'</h3><p>'+p.detail+'</p><div class="store-price">'+(p.price||'Price on request')+'</div><button class="product-cta" type="button" data-add-product="'+p.id+'">ADD TO CART <i class="bi bi-bag-plus"></i></button></div></article></div>'
}
function bigiRenderCart(root){
 const cart=bigiGetCart();
 if(!cart.length){root.innerHTML='<div class="cart-empty"><i class="bi bi-bag-x"></i><h2>Your cart is empty</h2><p>Explore our collections and add the gadgets you want.</p><a class="btn btn-electric" href="phones.html">SHOP PHONES</a> <a class="btn btn-outline-dark rounded-pill" href="laptops.html">SHOP LAPTOPS</a></div>';return}
 const quantity=cart.reduce((sum,item)=>sum+item.qty,0);
 const rows=cart.map(item=>{const p=BIGI_PRODUCTS.find(x=>x.id===item.id);if(!p)return "";const icon=p.art==="phone"?"bi-phone":p.art==="laptop"?"bi-laptop":"bi-tablet";return '<div class="cart-row"><div class="cart-thumb"><i class="bi '+icon+'"></i></div><div class="cart-product"><strong>'+p.name+'</strong><small>'+p.detail+'</small><span>'+(p.price||'Price to be confirmed')+'</span></div><div class="cart-qty"><button type="button" data-qty-minus="'+p.id+'">−</button><b>'+item.qty+'</b><button type="button" data-qty-plus="'+p.id+'">+</button></div><button type="button" class="cart-remove" data-remove="'+p.id+'" aria-label="Remove item"><i class="bi bi-trash"></i></button></div>'}).join("");
 root.innerHTML='<div class="cart-layout"><div class="cart-items"><div class="cart-heading"><h2>Your selections</h2><span>'+quantity+' item(s)</span></div>'+rows+'</div><aside class="cart-summary"><p class="eyebrow">ORDER SUMMARY</p><h3>Almost yours.</h3><div class="summary-line"><span>Items</span><b>'+quantity+'</b></div><div class="summary-line"><span>Product prices</span><b>Confirm on WhatsApp</b></div><div class="summary-line total"><span>Total</span><b>To be confirmed</b></div><p class="summary-note">We'll confirm current prices, availability and delivery details with you before payment.</p><label class="customer-label" for="customerName">Your name (optional)</label><input id="customerName" class="form-control" placeholder="Enter your name"><button class="btn btn-electric w-100 mt-3" id="sendOrder">SEND ORDER TO WHATSAPP <i class="bi bi-whatsapp"></i></button><small class="secure-note">A unique order code will be included in your message.</small><p class="order-code-notice" id="orderCodeNotice"></p></aside></div>';
 root.querySelectorAll("[data-qty-plus]").forEach(btn=>btn.addEventListener("click",()=>{const c=bigiGetCart(),i=c.find(x=>x.id===btn.dataset.qtyPlus);if(i)i.qty++;bigiSaveCart(c);bigiRenderCart(root)}));
 root.querySelectorAll("[data-qty-minus]").forEach(btn=>btn.addEventListener("click",()=>{const c=bigiGetCart(),i=c.find(x=>x.id===btn.dataset.qtyMinus);if(i)i.qty--;bigiSaveCart(c.filter(x=>x.qty>0));bigiRenderCart(root)}));
 root.querySelectorAll("[data-remove]").forEach(btn=>btn.addEventListener("click",()=>{bigiSaveCart(bigiGetCart().filter(x=>x.id!==btn.dataset.remove));bigiRenderCart(root)}));
 root.querySelector("#sendOrder").addEventListener("click",()=>{const items=bigiGetCart();if(!items.length)return;const now=new Date(),day=now.getFullYear()+String(now.getMonth()+1).padStart(2,"0")+String(now.getDate()).padStart(2,"0"),code="BIGI-"+day+"-"+Math.floor(1000+Math.random()*9000),name=root.querySelector("#customerName").value.trim()||"Not provided";const lines=items.map((item,index)=>{const p=BIGI_PRODUCTS.find(x=>x.id===item.id);return (index+1)+". "+p.name+" ("+p.detail+") — Qty: "+item.qty+" — Price: '+(p.price||'To be confirmed')+'"});const message="Hello Bigi Gadgets! I want to place an order.\n\nORDER CODE: "+code+"\nCustomer: "+name+"\n\nITEMS:\n"+lines.join("\n")+"\n\nTotal: Please confirm current prices and availability.\nPlease assist me with this order.";const link="https://wa.me/2349046734309?text="+encodeURIComponent(message);const notice=root.querySelector("#orderCodeNotice");notice.textContent="Your order code is "+code+". Keep it for reference.";window.open(link,"_blank","noopener")});
}
document.addEventListener("DOMContentLoaded",()=>{bigiUpdateCartCount();document.querySelectorAll("[data-add-product]").forEach(btn=>btn.addEventListener("click",()=>bigiAddToCart(btn.dataset.addProduct)));const catalog=document.querySelector("[data-store-category]");if(catalog){catalog.innerHTML=BIGI_PRODUCTS.filter(p=>p.category===catalog.dataset.storeCategory).map(bigiCard).join("");catalog.querySelectorAll("[data-add-product]").forEach(btn=>btn.addEventListener("click",()=>bigiAddToCart(btn.dataset.addProduct)))}const root=document.querySelector("[data-cart-root]");if(root)bigiRenderCart(root)});
