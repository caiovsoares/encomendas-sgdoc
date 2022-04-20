const gerador = (str1, str2, str3) => {
    const n = ((Math.random() * 10 + 1) % 2).toFixed(0)
    switch (n) {
        case '0':
            return str1
        case '1':
            return str2
        case '2':
            return str3
    }
}

export const exampleMails = (q) => {

    let bigMails = new Array(q)
    bigMails.fill(1)
    bigMails = bigMails.map((e, i) => {
        return (
            {
                id: i,
                tracking: `BR${(Math.random() * 899999999 + 100000000).toFixed(0)}BR`,
                type: gerador('Caixa', 'Pacote', 'Envelope'),
                size: gerador('P', 'M', 'G'),
                sender: gerador('Mercado Livre', 'Amazon', 'Shopee'),
                destiny: {
                    id: i,
                    fullName: gerador('Caio Vinicius Amancio Soares', 'Gabriel Silva Ramos', 'Clarice Outrora Outronome'),
                    warName: gerador('C4 Mariane Mocker', 'C3 Fagundes', 'C2 Victoria'),
                    classYear: gerador('2020', '2021', '2022'),
                    cpf: gerador('126.882.218-33', '377.466.108-11', '430.103.428-53'),
                    identity: gerador('20YS0162', '21YS0241', '22YS0121')
                },
                created_at: gerador('2021-06-25 14:35:22', '2021-06-26 09:35:22', '2021-04-12 12:15:22'),
                received_at: gerador('2021-08-03 16:45:22', '2021-07-02 14:22:22', '2021-11-11 13:05:22'),
                receiver: gerador({
                    id: i,
                    fullName: gerador('Caio Vinicius Amancio Soares', 'Gabriel Silva Ramos', 'Clarice Outrora Outronome'),
                    warName: gerador('C4 Mariane Mocker', 'C3 Fagundes', 'C2 Victoria'),
                    classYear: gerador('2020', '2021', '2022'),
                    cpf: gerador('126.882.218-33', '377.466.108-11', '430.103.428-53'),
                    identity: gerador('20YS0162', '21YS0241', '22YS0121')
                }, {
                    id: i,
                    fullName: gerador('Caio Vinicius Amancio Soares', 'Gabriel Silva Ramos', 'Clarice Outrora Outronome'),
                    warName: gerador('C4 Mariane Mocker', 'C3 Fagundes', 'C2 Victoria'),
                    classYear: gerador('2020', '2021', '2022'),
                    cpf: gerador('126.882.218-33', '377.466.108-11', '430.103.428-53'),
                    identity: gerador('20YS0162', '21YS0241', '22YS0121')
                }, null)
            }
        )
    })

    return bigMails
}

export const proxyConfig = {
    host: 'proxy.gapys.intraer',
    port: 8080,
    auth: {
        username: '46077534838',
        password: 'Opticom1!'
    }

}