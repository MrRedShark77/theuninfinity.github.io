var player
var lastUpdate = Date.now()
var idNum = [null, "Multi", "Meta", "Mega", "Giga", "Tera", "Peta", "Exa", "Zetta", "Yotta"]
var maxNumTabs = [null, 4]
var NameTabs = [null, "mt"]
var ne = false

function updateNewPlayer() {
    document.getElementById("inf").classList.add("hide")
    player = {
        money: 10,
        numbers: [],
        iupgrades: [],
        achunlocked: [],
        ip: 0,
        dsm: 2,
        infiniteCount: 0,
        mult: 1.01,
        nmult: 10,
        ileft: 2,
        N: 2,
    }

    for (let i = 0; i < 10; i++) {
        player.achunlocked.push(0)
    }
    
    for (let i = 1; i < 2; i++) {
        for (let j = 1; j < maxNumTabs[i] + 1; j++) {
            document.getElementById(NameTabs[i] + j).classList.add("hide")
        }
        document.getElementById(NameTabs[i] + 1).classList.remove("hide")
    }

    document.getElementById("u1").classList.remove("hide")

    for (let i = 0; i < idNum.length - 1; i++) {
        let num = {
            sCost: Math.pow(10, 2 * i + 1),
            cost: Math.pow(10, 2 * i + 1),
            nextmult: Math.pow(10, 2 * i + 1),
            count: 0,
            mult: 1 / Math.pow(player.dsm, i + 1),
            buys: 0,
        }
        player.numbers.push(num)
    }

    for (let i = 0; i < 1; i++) {
        let iupg = {
            info: "Decrease repeating buy numbers by 1, multiple multipled numbers after repeating by 2 - 2^(buyingNumbers/(10-levelUpgrades))",
            level: 0,
            cost: 1,
            maxlvl: 5,
        }
        player.iupgrades.push(iupg)
    }
}

updateNewPlayer()

function gameLoop() {
    let diff = (Date.now() - lastUpdate) / 1000
    
    Loop(diff)
    updateGUI()

    lastUpdate = Date.now()
}

function format(num) {
    if (Math.log10(num) < -324) return 0
    if (Math.log10(num) > 308) return "Infinity"
    
    let e
    e = Math.floor(Math.log10(num))
    
    let m = num / Math.pow(10, e)
    if (e < 3 && -3 < e) return num.toFixed(2)
    return m.toFixed(2) + "e" + e
}

function notify(name, icon) {
    Push.create("Achievement unlocked", {
        body: name,
        icon: icon,
        timeout: 5000,
    })
}

function buyNumber(n) {
    let num = player.numbers[n - 1]
    if (num.cost <= player.money) {
        player.money -= num.cost
        num.count += 1
        num.buys += 1
        num.cost = num.sCost * Math.pow(num.nextmult, num.buys / 10)

        player.achunlocked[n - 1] = 1
    }
}

function showTab(id, tabName, maxNum) {
    for (let i = 1; i < maxNum + 1; i++) {
        document.getElementById(tabName + i).classList.add("hide")
    }
    document.getElementById(tabName + id).classList.remove("hide")
}

function Loop(diff) {
    player.money += player.numbers[0].count * Math.pow(player.mult, player.numbers[0].count / (player.nmult)) * Math.pow(2, player.numbers[0].buys / (10 - player.iupgrades[0].level)) * player.numbers[0].mult * diff
    for (let i = 0; i < 4; i++) {
        player.numbers[i].count += player.numbers[i + 1].count * Math.pow(player.mult, player.numbers[i + 1].count / (player.nmult)) * Math.pow(2, player.numbers[i + 1].buys / (10 - player.iupgrades[0].level)) * player.numbers[i + 1].mult * diff
    }
}

function updateGUI() {
    document.getElementById("money").textContent = format(player.money)
    document.getElementById("mps").textContent = "You gain " + format(player.numbers[0].count * Math.pow(player.mult, player.numbers[0].count / (player.nmult)) * Math.pow(2, player.numbers[0].buys / (10 - player.iupgrades[0].level)) * player.numbers[0].mult) + " per second"

    for (let i = 1; i < 6; i++) {
        let num = player.numbers[i - 1]
        
        document.getElementById("num" + i).innerHTML = idNum[i] + "-Numbers <br> x" + format(Math.pow(player.mult, num.count / (player.nmult)) * Math.pow(2, num.buys / (10 - player.iupgrades[0].level)) * num.mult) + " - " + format(num.count) + "<br> Cost: " + format(num.cost)
        
        if (num.cost > player.money) document.getElementById("num" + i).classList.add("locked")
        else document.getElementById("num" + i).classList.remove("locked")
        
        if (player.infiniteCount > 1) document.getElementById("num3").classList.remove("hide")
        else document.getElementById("num3").classList.add("hide")

        if (player.infiniteCount > 4) document.getElementById("num4").classList.remove("hide")
        else document.getElementById("num4").classList.add("hide")

        if (player.infiniteCount > 8) document.getElementById("num5").classList.remove("hide")
        else document.getElementById("num5").classList.add("hide")
    }

    if (Math.log10(player.money) > 308) document.getElementById("inf").classList.remove("hide")
    else document.getElementById("inf").classList.add("hide")

    document.getElementById("inf").innerHTML = "You will gain 1 infinity points! But will increased squared divide multipler every numbers by " + ((player.infiniteCount + 1) / 10) + ": <br>" + format(player.dsm) + " -> " + format(player.dsm + (player.infiniteCount + 1) / 10) + "<br> And cost numbers: (10+infinites/2)^(buysnumber/10)"
    document.getElementById("infCount").textContent = "You clicked " + player.infiniteCount + " infinites"

    if (player.infiniteCount > 0) document.getElementById("u1").classList.remove("hide")
    else document.getElementById("u1").classList.add("hide")

    document.getElementById("ip").textContent = player.ip

    for (let i = 0; i < 1; i++) {
        let iupg = player.iupgrades[i]
        document.getElementById("iu" + (i + 1)).innerHTML = iupg.info + "<br>Cost: " + iupg.cost + " IP"
        
        if (iupg.cost > player.ip) document.getElementById("iu" + (i + 1)).classList.add("locked")
        else document.getElementById("iu" + (i + 1)).classList.remove("locked")

        if (iupg.level >= iupg.maxlvl) document.getElementById("iu" + (i + 1)).classList.add("maxed")
        else document.getElementById("iu" + (i + 1)).classList.remove("maxed")
    }

    document.getElementById("nextunlock").textContent = "Have " + (player.ileft - player.infiniteCount) + " infinites left for unlock " + idNum[player.N + 1] + "-Numbers"

    for (let i = 0; i < player.achunlocked.length; i++) {
        if (player.achunlocked[i] == 1) document.getElementById("r" + (i + 1)).classList.add("unlock")
        else document.getElementById("r" + (i + 1)).classList.remove("unlock")
    }
}

setInterval(gameLoop, 50)