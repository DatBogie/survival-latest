var xVel = 0;
var lastX = 0;

const xOffset = 9;
const yOffset = 2;

var justLoaded = true;

var selectedTab = "t-1";

function embedOpen(url) {
    const blur = document.querySelector(".blur-bg");
    blur.style.animationName = "blur-bg-open";
    blur.style.display = "block";

    const popup = document.querySelector(".if-popup");
    popup.style.animationName = "if-popup-open";
    popup.style.display = "block";
    const urlBar = document.getElementById("if-url");
    urlBar.textContent = url;
    const iframe = popup.querySelector("iframe");
    iframe.src = url;

    if (url.indexOf("drive.usercontent.google") == -1) return;
    const doc = (iframe.contentDocument || iframe.contentWindow.document);
    const style = doc.createElement("style");
    style.textContent =
    `body {
        background-color: #24273a;
    }
    div {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: #24273a;
        color: #cad3f5;
        margin-left: 2vw;
        margin-right: 2vw;
        margin-top: 2vh;
        margin-bottom: 2vh;
        font-size: 2rem;
        font-family: "Nunito", serif;
    }
    span {
        opacity: 0%;
        transition: opacity 200ms ease;
    }
    p {
        font-size: 1rem;
    }`;
    doc.head.appendChild(style);

    const link0 = doc.createElement("link");
    link0.textContent = `<link rel="preconnect" href="https://fonts.googleapis.com">`;
    const link1 = doc.createElement("link");
    link1.textContent = `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`;
    const link2 = doc.createElement("link");
    link2.textContent = `<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">`;

    const div = doc.createElement("div");
    div.id = "dl-loading";
    div.innerHTML = `<i>Preparing your download</i><span id="1">.</span><span id="2">.</span><span id="3">.</span><br><p>Some levels take longer to download than others.<br>Please be patient!</p>`;
    doc.body.appendChild(div);

    const script = doc.createElement("script");
    script.textContent =
    `const a = document.getElementById("1");
    const b = document.getElementById("2");
    const c = document.getElementById("3");
    var active = -1;
    setInterval(()=>{
        a.style.opacity = "100%";
        setTimeout(()=>{
            b.style.opacity = "100%"
        },100);
        setTimeout(()=>{
            c.style.opacity = "100%"
        },200);
        setTimeout(()=>{
            a.style.opacity = "0%";
        },600);
        setTimeout(()=>{
            b.style.opacity = "0%";
        },700);
        setTimeout(()=>{
            c.style.opacity = "0%";
        },800);
    },1200);`;
    doc.body.appendChild(script);
}

function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 4;
    return x === 0
    ? 0
    : x === 1
    ? 1
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - .75) * c4) + 1;
}

window.addEventListener("load",function() {
    const links = document.querySelectorAll(".link, .functional-link");
    links.forEach((link)=>{
        link.addEventListener("click",()=>{
            embedOpen(link.dataset.href);
        });
        var targetted = false;
        link.addEventListener("mousedown",(e)=>{
            if (e.button != 1) return;
            targetted = true;
        });
        link.addEventListener("mouseup",(e)=>{
            if (e.button != 1 || !targetted) return;
            targetted = false;
            open(link.dataset.href);
        });
    });
    document.querySelectorAll(".tabpage").forEach((tab)=>{
        tab.querySelectorAll("div:has(input)").forEach((div)=>{
            div.firstElementChild.classList.add("first-el");
            div.lastElementChild.classList.add("last-el");
        });
    });
    document.getElementById("if-open").addEventListener("click",() => {
        const url = document.querySelector(".if-popup").querySelector("#if-url").textContent;
        open(url);
        document.getElementById("if-close").click();
    });
    document.getElementById("if-close").addEventListener("click",() => {
        const blur = document.querySelector(".blur-bg");
        blur.style.animationName = "blur-bg-close";
        blur.classList.add("blur-bg-closing");
        setTimeout(() => {
            blur.style.display = "none";
            blur.classList.remove("blur-bg-closing");
        },Number(getComputedStyle(blur).animationDuration.slice(0,-1))*1000);

        const popup = document.querySelector(".if-popup");
        popup.style.animationName = "if-popup-close";
        popup.classList.add("if-closing");
        setTimeout(() => {
            popup.style.display = "none";
            popup.classList.remove("if-closing");
            popup.querySelector("iframe").src = "";
            document.getElementById("if-url").textContent = "";
        },Number(getComputedStyle(popup).animationDuration.slice(0,-1))*1000);
    });
    // document.getElementById("open-adofai").addEventListener("click",function() {
    //     embedOpen("adofai-level-browser-legacy.html");
    // });
    document.querySelectorAll(".expanding-hr").forEach((el)=>{
        el.style.animationName = "hr-expand";
    });
    const cur = document.querySelector(".cursor");
    document.querySelector(".if-popup").addEventListener("mouseenter",() => {
        cur.style.display = "none";
    });
    document.querySelector(".if-popup").addEventListener("mouseleave",() => {
        cur.style.display = "block";
    });
    setInterval(function() {
        if (xVel < 0) {
            xVel+=700;
            if (xVel > 0) {
                xVel = 0;
            }
        } else {
            xVel-=700;
            if (xVel < 0) {
                xVel = 0
            }
        }
        cur.style.rotate = xVel+"deg";
    },100);
    document.body.style.transition = "margin-top 1s ease, opacity 1s ease-out";
    document.body.style.marginTop = "8px";
    document.body.style.opacity = "100%";

    const tabbtns = this.document.querySelectorAll(".tabbtn");
    tabbtns.forEach((el)=>{
        if (el.id == selectedTab) {
            el.classList.add("selected");
            document.getElementById("tab."+selectedTab).style.display = "block";
        }
        el.addEventListener("click",function() {
            document.getElementById("tab."+selectedTab).style.display = "none";
            document.getElementById(selectedTab).classList.remove("selected");
            selectedTab = el.id;
            el.classList.add("selected");
            document.getElementById("tab."+selectedTab).style.display = "block";
            document.getElementById("tab."+selectedTab).style.animationName = "tabpage";
        });
    });

    document.querySelectorAll(".copy-code").forEach((btn)=>{
        const code = btn.parentElement.querySelector("code");
        btn.addEventListener("click",()=>{
            navigator.clipboard.writeText(code.textContent).then(()=>{
                btn.textContent = "Copied!";
                setTimeout(()=>{
                    btn.textContent = "Copy";
                },500);
            });
        });
    });
    document.querySelectorAll(".copy-data").forEach((btn)=>{
        btn.addEventListener("click",()=>{
            const data = btn.dataset.data;
            navigator.clipboard.writeText(data).then(()=>{
                btn.textContent = "Copied!";
                setTimeout(()=>{
                    btn.textContent = "Copy";
                },500);
            });
        });
    });
    
    document.querySelectorAll(".footnote").forEach((foot)=>{
        const parent = foot.parentElement;
        parent.addEventListener("mouseenter",()=>{
            foot.style.fontWeight = "900";
            foot.style.transform = "translateY(-5px)";
        });
        parent.addEventListener("mouseleave",()=>{
            foot.style.fontWeight = "unset";
            foot.style.transform = "unset";
        });
    });
});

window.addEventListener("mousemove",function(m) {
    let cur = document.querySelector(".cursor");
    cur.style.left = m.x-xOffset + "px";
    cur.style.top = m.y-yOffset + "px";
    cur.style.display = "block";

    xVel += (m.x-lastX)/12;
    if (xVel > 90) {
        xVel = 90;
    } else if (xVel < -90) {
        xVel = -90;
    }

    if (justLoaded) {
        xVel = 0;
    }

    cur.style.rotate = xVel+"deg";

    lastX = m.x;

    justLoaded = false;
});

window.addEventListener("mousedown",function() {
    let cur = this.document.querySelector(".cursor");
    cur.style.scale = .85;
});

window.addEventListener("mouseup",function() {
    let cur = this.document.querySelector(".cursor");
    cur.style.scale = 1;
});