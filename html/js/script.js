window.onload = () => {
    let dados = new Object();

    dados.nome = "joaozinho";
    dados.idade = "24"
    dados.hipertensao = "n";
    dados.diabetes = "n";
    dados.faltaDeAr = "s";
    dados.coriza = "s";
    dados.tosse = "s";
    dados.diarreia = "s";
    dados.sono = "n";
    dados.confusao = "n";
    dados.nauseVomito = "n";
    dados.inchaco = "n";

    dados.pa = "110";
    dados.temp = "38";

    validaDados(dados);
}

validaDados = (dados) => {
    let valPa, valTemp, comorbidade = 0;
    
    valPa = valTempPa("pa", dados.pa, 90, 100);
    valTemp = valTempPa("temp",dados.temp, 35, 37.5);

    comorbidade += valComorbidade(dados.idade);    
    comorbidade += valComorbidade(dados.hipertensao);
    comorbidade += valComorbidade(dados.diabetes);
    comorbidade += valComorbidade(dados.faltaDeAr);
    comorbidade += valComorbidade(dados.coriza);
    comorbidade += valComorbidade(dados.tosse);
    comorbidade += valComorbidade(dados.diarreia);
    comorbidade += valComorbidade(dados.sono);
    comorbidade += valComorbidade(dados.confusao);
    comorbidade += valComorbidade(dados.nauseVomito);
    comorbidade += valComorbidade(dados.inchaco);

    let laudo = new Object();
    laudo.comorbidade = comorbidade;
    laudo.valPa = valPa;
    laudo.valTemp = valTemp;

    imprimiDados(laudo, dados);    
}

valTempPa = (campo, valor, vl_min, vl_max) => {
    let valDados;

    if (campo == "pa") {
        valDados = valor >= vl_min && valor <= vl_max ? 1 : "u";
    } else {
        valDados = valor < vl_min || valor <= vl_max ? 1 : "u";
    }

    return valDados;
}

valComorbidade = (v) => {
    return v > 60 || v == "s" || v == "sim" ? 1 : 0;
}

imprimiDados = (laudo, dados) => {

    let atendimento, html, grauAtendimento;
    grauAtendimento = laudo.valPa == "u" || laudo.valTemp == "u" || laudo.comorbidade > 2 ? "Urgente" : "Medio";
    atendimento = laudo.valPa == "u" || laudo.valTemp == "u" || laudo.comorbidade > 2 ? "Sim" : "Não";
    
    html =   "<span>Nome: </span> " + dados.nome
                + "<span> Idade: </span> " + dados.idade + "<br> <br>"
                + "<span> Paciente deve ter atendimento médico: " + atendimento + "<br>"
                + "<span> Grau de atendimento: " + atendimento + "<br> <br>"

                + "<span>Hipertenso: </span>" + dados.hipertensao  + "<br>"
                + "<span>Diabetes: </span>" + dados.diabetes + "<br>"
                + "<span>Temperatura: </span>" + dados.temp + "<br>"
                + "<span>Pa: </span>" + dados.pa + "<br>"
                + "<span>Está com falta de ar: </span>" + dados.faltaDeAr + "<br>"
                + "<span>Coriza: </span>" + dados.coriza + "<br>"
                + "<span>Tosse: </span>" + dados.tosse + "<br>"
                + "<span>Diarreia: </span>" + dados.diarreia + "<br>"
                + "<span>Sono: </span>" + dados.sono + "<br>"
                + "<span>Confusao mental: </span>" + dados.confusao + "<br>"
                "<span>Está com alguma parte do corpo com inchaço: </span>" + dados.inchaco;
    $("#exibiList").html(html);
}