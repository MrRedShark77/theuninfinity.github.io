
function buyIUpgrade(n) {
    let iupg = player.iupgrades[n - 1]
    if (iupg.cost <= player.ip) {
        if (iupg.level < iupg.maxlvl && n == 1) {
            player.ip -= iupg.cost
            iupg.cost += 1
            iupg.level += 1
        }
    }
}

function gainInf() {
    player.ip += 1
    player.dsm += (player.infiniteCount + 1) / 10
    player.infiniteCount += 1
    player.nmult += player.infiniteCount * 2

    player.achunlocked[9] = 1

    if (player.achunlocked[9] == 1) {
        player.money = 100
    }

    if (player.infiniteCount >= player.ileft && player.N <= 9) {
        player.N += 1
        player.ileft += player.N
    }

    for (let i = 0; i < idNum.length; i++) {
        let num = player.numbers[i]
        num.cost = Math.pow(10, 2 * i + 1)
        num.nextmult = Math.pow(10 + player.infiniteCount / 2, 2 * i + 1)
        num.count = 0
        num.mult = 1 / Math.pow(player.dsm, i + 1)
        num.buys = 0
    }
}