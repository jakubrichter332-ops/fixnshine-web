import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} />
          Zpět na hlavní stránku
        </Link>

        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Zásady ochrany osobních údajů
        </h1>
        <p className="text-text-muted text-sm mb-10">
          Platné od: 17. 3. 2026
        </p>

        <div className="space-y-10 text-text-secondary text-sm leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">
              1. Totožnost a kontaktní údaje správce
            </h2>
            <p>Správcem Vašich osobních údajů je:</p>
            <p className="mt-2">
              Jakub Richter, IČO: 21591016
              <br />
              Sídlo: Na Hřebenech I 673/19
              <br />
              Email: fns.fixnshine@gmail.com
              <br />
              Telefon: +420 608 144 005
            </p>
            <p className="mt-2">(dále jen „správce")</p>
            <p className="mt-2 text-text-muted italic text-xs">
              Právní základ: čl. 13 odst. 1 písm. a) nařízení (EU) 2016/679
              (GDPR)
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">
              2. Jaké osobní údaje zpracováváme
            </h2>
            <p className="mb-4">
              V rámci poskytování služeb automyčky a provozu rezervačního
              systému zpracováváme tyto osobní údaje:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-4 py-2 text-left text-text-primary font-medium">
                      Osobní údaj
                    </th>
                    <th className="px-4 py-2 text-left text-text-primary font-medium">
                      Povinný/Nepovinný
                    </th>
                    <th className="px-4 py-2 text-left text-text-primary font-medium">
                      Účel
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-2">Jméno a příjmení</td>
                    <td className="px-4 py-2">Povinný</td>
                    <td className="px-4 py-2">
                      Identifikace zákazníka, rezervace
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-2">E-mailová adresa</td>
                    <td className="px-4 py-2">Povinný</td>
                    <td className="px-4 py-2">
                      Potvrzení rezervace, komunikace
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-2">Telefonní číslo</td>
                    <td className="px-4 py-2">Povinný</td>
                    <td className="px-4 py-2">Kontakt ohledně rezervace</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">SPZ vozidla</td>
                    <td className="px-4 py-2">Povinný</td>
                    <td className="px-4 py-2">
                      Identifikace vozidla pro poskytnutí služby
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              <strong className="text-text-primary">
                Nesbíráme žádné zvláštní kategorie osobních údajů
              </strong>{" "}
              (údaje o zdravotním stavu, biometrické údaje apod.) ve smyslu čl.
              9 GDPR.
            </p>
            <p className="mt-2 text-text-muted italic text-xs">
              Právní základ: čl. 13 odst. 1 písm. c) a čl. 5 odst. 1 písm. c)
              GDPR (zásada minimalizace údajů)
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">
              3. Účely a právní základy zpracování
            </h2>

            <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">
              3.1 Rezervace a poskytnutí služby automyčky
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong>Účel:</strong> Zpracování Vaší rezervace, poskytnutí
                objednané služby, komunikace ohledně termínu
              </li>
              <li>
                <strong>Právní základ:</strong> Plnění smlouvy dle čl. 6 odst.
                1 písm. b) GDPR
              </li>
              <li>
                <strong>Dotčené údaje:</strong> Jméno, e-mail, telefon, SPZ
              </li>
            </ul>

            <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">
              3.2 Plnění právních povinností (účetnictví, daně)
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong>Účel:</strong> Vedení účetní evidence, vystavování
                daňových dokladů, plnění povinností vůči finančnímu úřadu
              </li>
              <li>
                <strong>Právní základ:</strong> Plnění právní povinnosti dle
                čl. 6 odst. 1 písm. c) GDPR
              </li>
              <li>
                <strong>Dotčené údaje:</strong> Jméno, fakturační údaje
              </li>
            </ul>

            <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">
              3.3 Oprávněný zájem správce
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong>Účel:</strong> Ochrana práv správce (řešení reklamací,
                případných sporů), prevence zneužití rezervačního systému
              </li>
              <li>
                <strong>Právní základ:</strong> Oprávněný zájem správce dle čl.
                6 odst. 1 písm. f) GDPR
              </li>
              <li>
                <strong>Dotčené údaje:</strong> Jméno, e-mail, telefon, SPZ
              </li>
            </ul>

            <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">
              3.4 Zasílání obchodních sdělení (marketing) — pouze se souhlasem
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong>Účel:</strong> Zasílání informací o akcích, slevách a
                novinkách automyčky
              </li>
              <li>
                <strong>Právní základ:</strong> Souhlas dle čl. 6 odst. 1 písm.
                a) GDPR a § 7 zákona č. 480/2004 Sb.
              </li>
              <li>
                <strong>Dotčené údaje:</strong> E-mail, případně jméno
              </li>
            </ul>
            <p className="mt-2 text-text-muted text-xs">
              Souhlas je zcela dobrovolný. Neposkytnutí souhlasu nemá žádný vliv
              na poskytnutí služby.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">
              4. Doba uchování osobních údajů
            </h2>
            <p className="mb-4">
              Vaše osobní údaje uchováváme pouze po dobu nezbytně nutnou pro
              daný účel:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-4 py-2 text-left text-text-primary font-medium">
                      Účel zpracování
                    </th>
                    <th className="px-4 py-2 text-left text-text-primary font-medium">
                      Doba uchování
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-2">Rezervace a poskytnutí služby</td>
                    <td className="px-4 py-2">
                      Po dobu poskytování služby + 3 roky (promlčecí lhůta dle §
                      629 zákona č. 89/2012 Sb.)
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-2">Účetní a daňové doklady</td>
                    <td className="px-4 py-2">
                      5 let od konce účetního období dle § 31 zákona č. 563/1991
                      Sb.; resp. 10 let u účetní závěrky
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-2">
                      Oprávněný zájem (reklamace, spory)
                    </td>
                    <td className="px-4 py-2">
                      3 roky od poskytnutí služby
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Marketing (obchodní sdělení)</td>
                    <td className="px-4 py-2">
                      Do odvolání souhlasu, nejdéle 3 roky od posledního kontaktu
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              Po uplynutí doby uchování budou Vaše osobní údaje bezpečně
              vymazány nebo anonymizovány.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">
              5. Příjemci osobních údajů
            </h2>
            <p className="mb-3">
              Vaše osobní údaje mohou být předány těmto kategoriím příjemců:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Poskytovatel rezervačního systému</strong> — Supabase
                (databáze) — v roli zpracovatele osobních údajů na základě
                zpracovatelské smlouvy dle čl. 28 GDPR
              </li>
              <li>
                <strong>Poskytovatel webhostingu</strong> — Vercel — v roli
                zpracovatele
              </li>
              <li>
                <strong>Účetní / daňový poradce</strong> — v roli zpracovatele
                nebo samostatného správce
              </li>
              <li>
                <strong>Orgány veřejné moci</strong> — finanční úřad, soudy —
                pouze na základě zákonné povinnosti
              </li>
            </ul>
            <p className="mt-4">
              Vaše osobní údaje nepředáváme do třetích zemí mimo Evropský
              hospodářský prostor (EU/EHP).
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">
              6. Vaše práva jako subjektu údajů
            </h2>

            <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">
              6.1 Právo na přístup (čl. 15 GDPR)
            </h3>
            <p>
              Máte právo získat od správce potvrzení, zda jsou Vaše osobní údaje
              zpracovávány, a pokud ano, máte právo získat přístup k těmto
              údajům a k informacím o zpracování.
            </p>

            <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">
              6.2 Právo na opravu (čl. 16 GDPR)
            </h3>
            <p>
              Máte právo požadovat opravu nepřesných osobních údajů nebo
              doplnění neúplných údajů.
            </p>

            <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">
              6.3 Právo na výmaz — „právo být zapomenut" (čl. 17 GDPR)
            </h3>
            <p>
              Máte právo požadovat výmaz Vašich osobních údajů, pokud již
              nejsou potřebné pro účel zpracování, odvoláte souhlas, nebo
              vznesete námitku. Toto právo se neuplatní, pokud je zpracování
              nezbytné pro splnění právní povinnosti.
            </p>

            <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">
              6.4 Právo na omezení zpracování (čl. 18 GDPR)
            </h3>
            <p>
              Máte právo požadovat omezení zpracování, např. pokud popíráte
              přesnost údajů nebo jste vznesli námitku proti zpracování.
            </p>

            <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">
              6.5 Právo na přenositelnost údajů (čl. 20 GDPR)
            </h3>
            <p>
              Máte právo získat své osobní údaje ve strukturovaném, běžně
              používaném a strojově čitelném formátu a předat je jinému správci.
            </p>

            <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">
              6.6 Právo vznést námitku (čl. 21 GDPR)
            </h3>
            <p>
              Máte právo kdykoli vznést námitku proti zpracování Vašich osobních
              údajů, které je založeno na oprávněném zájmu správce. Správce v
              takovém případě údaje dále nezpracovává, pokud neprokáže závažné
              oprávněné důvody.
            </p>

            <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">
              6.7 Právo odvolat souhlas (čl. 7 odst. 3 GDPR)
            </h3>
            <p>
              Pokud je zpracování založeno na Vašem souhlasu, máte právo tento
              souhlas kdykoli odvolat, a to e-mailem na fns.fixnshine@gmail.com
              nebo kliknutím na odkaz „odhlásit se" v každém marketingovém
              e-mailu. Odvolání souhlasu nemá vliv na zákonnost zpracování před
              jeho odvoláním.
            </p>

            <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">
              6.8 Právo podat stížnost u dozorového úřadu (čl. 77 GDPR)
            </h3>
            <p>
              Pokud se domníváte, že zpracováním Vašich osobních údajů dochází
              k porušení GDPR, máte právo podat stížnost u:
            </p>
            <p className="mt-2">
              <strong className="text-text-primary">
                Úřad pro ochranu osobních údajů (ÚOOÚ)
              </strong>
              <br />
              Pplk. Sochora 27, 170 00 Praha 7
              <br />
              Web: www.uoou.cz
              <br />
              E-mail: posta@uoou.cz
              <br />
              Tel.: +420 234 665 111
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">
              7. Jak svá práva uplatnit
            </h2>
            <p>Svá práva můžete uplatnit:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
              <li>
                E-mailem: fns.fixnshine@gmail.com
              </li>
              <li>Písemně: Na Hřebenech I 673/19</li>
            </ul>
            <p className="mt-4">
              Na Vaši žádost odpovíme bez zbytečného odkladu,{" "}
              <strong className="text-text-primary">
                nejpozději do 1 měsíce
              </strong>{" "}
              od obdržení žádosti. V odůvodněných případech může být lhůta
              prodloužena o další 2 měsíce.
            </p>
            <p className="mt-2">
              Vyřízení žádosti je{" "}
              <strong className="text-text-primary">bezplatné</strong>. Pokud
              by žádost byla zjevně nedůvodná nebo nepřiměřená, můžeme účtovat
              přiměřený poplatek nebo žádost odmítnout.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">
              8. Zabezpečení osobních údajů
            </h2>
            <p className="mb-3">
              Přijali jsme vhodná technická a organizační opatření k zajištění
              bezpečnosti Vašich osobních údajů v souladu s čl. 32 GDPR,
              zejména:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                Přístup k osobním údajům je omezen pouze na oprávněné osoby
              </li>
              <li>
                Komunikace přes webové stránky je šifrována (HTTPS/SSL)
              </li>
              <li>
                Rezervační systém je zabezpečen heslem a přístupovými právy
              </li>
              <li>Pravidelná aktualizace softwaru a bezpečnostních záplat</li>
              <li>Zálohování dat</li>
            </ul>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">
              9. Změny těchto zásad
            </h2>
            <p>
              Tyto zásady ochrany osobních údajů můžeme příležitostně
              aktualizovat. Aktuální verze je vždy dostupná na našich webových
              stránkách. O podstatných změnách Vás budeme informovat.
            </p>
            <p className="mt-4">
              <strong className="text-text-primary">
                Poslední aktualizace:
              </strong>{" "}
              17. 3. 2026
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">
              10. Právní předpisy
            </h2>
            <p className="mb-3">
              Tyto zásady vycházejí z následujících právních předpisů:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                Nařízení Evropského parlamentu a Rady (EU) 2016/679 (GDPR)
              </li>
              <li>
                Zákon č. 110/2019 Sb., o zpracování osobních údajů
              </li>
              <li>
                Zákon č. 480/2004 Sb., o některých službách informační
                společnosti
              </li>
              <li>Zákon č. 563/1991 Sb., o účetnictví</li>
              <li>Zákon č. 89/2012 Sb., občanský zákoník</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
