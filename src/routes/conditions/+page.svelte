<script lang="ts">
    
  import Header from '$lib/Header.svelte'
  import { onMount } from 'svelte';

</script>

<Header/>

<!-- ✅ Background fixé -->
<img src="/image%20principale/background.png" alt="background" class="fixed w-full h-full object-cover top-0 left-0 -z-10" />

  
<div class="mt-30 mb-10 prose prose-invert w-[70%] mx-auto p-8 backdrop-blur-md bg-white/40 border border-white/30 rounded-xl shadow-xl">
    <h2 id="preface" class="text-2xl font-bold underline mb-4">I. Préface</h2>
    <p>
        L'association <strong>Touffurs</strong>, loi 1901, organise la convention éponyme sous la forme d'une manifestation culturelle. Les présentes conditions s’adressent aux utilisateurs, membres et participants, et sont régies par le droit français. Tout litige sera soumis au tribunal compétent après tentative de résolution amiable.
    </p>
    <p>
        Une plateforme de règlement des litiges est accessible : <a href="http://ec.europa.eu/consumers/odr/" target="_blank">http://ec.europa.eu/consumers/odr/</a>
    </p>

    <h2 id="definitions" class="text-2xl font-bold underline mt-8 mb-4">II. Définitions</h2>
    <ul class="mb-[2em]">
        <li><strong>Utilisateur :</strong> Personne naviguant anonymement sur le site.</li>
        <li><strong>Membre :</strong> Utilisateur inscrit sur le site.</li>
        <li><strong>Participant :</strong> Membre ayant confirmé sa présence et payé la totalité de sa facture. Doit être majeur.</li>
        <li><strong>Marchandises :</strong> Biens physiques vendus sur le site.</li>
        <li><strong>Services :</strong> Hébergement, restauration, activités comprises dans l'événement.</li>
    </ul>

    <h2 id="ip" class="text-2xl font-bold underline mt-8 mb-4">III. Propriété Intellectuelle</h2>
    <p>
        Les contenus liés à Touffurs (textes, visuels, musiques, etc.) sont protégés par le droit d’auteur. Toute reproduction sans autorisation est interdite (article L335-2 du Code de la propriété intellectuelle).
    </p>

    <h2 id="cgu" class="text-2xl font-bold underline mt-8 mb-4">IV. Conditions Générales</h2>
    <p>
        En participant à Touffurs, l’utilisateur reconnaît avoir pris connaissance des CGV/CGU. Ces conditions peuvent être modifiées à tout moment.
    </p>

    <h2 id="archivage" class="text-2xl font-bold underline mt-8 mb-4">V. Archivage et Contrat</h2>
    <p>
        Toute commande validée implique acceptation des présentes conditions. Les informations saisies font foi en cas de litige.
    </p>

    <h2 id="responsabilite" class="text-2xl font-bold underline mt-8 mb-4">VI. Responsabilité</h2>
    <p>
        Touffurs est responsable de l’exécution du contrat sauf cas de force majeure, faute du participant ou d’un tiers imprévisible.
    </p>

    <h2 id="generalites" class="text-2xl font-bold underline mt-8 mb-4">VII. Généralités</h2>
    <p>
        Les membres s’engagent à fournir des informations exactes. Le numéro d’inscription est personnel, nécessaire pour l’accès à l’événement, et devra être accompagné d’une pièce d’identité valide.
    </p>

    <h2 id="donnes" class="text-2xl font-bold underline mt-8 mb-4">VIII. Données Personnelles</h2>
    <p>
        Touffurs s’engage à respecter la législation en vigueur sur la protection des données personnelles. Les membres peuvent exercer leurs droits par écrit avec justificatif d’identité.
    </p>

    <h2 id="tarifs" class="text-2xl font-bold underline mt-8 mb-4">IX. Tarification et Service Après-Vente</h2>
    <p>
        Les tarifs sont indiqués en euros TTC. Des variations peuvent intervenir sans préavis. Aucun remboursement partiel n’est accordé pour les activités non effectuées. Pour le SAV : <a href="mailto:registration@touffurs.org">registration@touffurs.org</a>
    </p>

    <h2 id="commandes" class="text-2xl font-bold underline mt-8 mb-4">X. Commandes</h2>
    <p>
        Toute commande implique validation, paiement, et devient un contrat temporaire d’adhésion à l'association Touffurs pour la durée de l’événement.
    </p>

    <h2 id="paiement" class="text-2xl font-bold underline mt-8 mb-4">XI. Paiement et Droit de Rétractation</h2>
    <p>
        Le paiement s’effectue par carte bancaire ou virement. Le remboursement est possible sous 14 jours après le premier versement. Passé ce délai, aucune demande ne sera acceptée. En cas d’annulation de l’événement, le participant a deux mois pour faire la demande.
    </p>

    <h2 id="remboursement" class="text-2xl font-bold underline mt-8 mb-4">XII. Modalités de Remboursement</h2>
    <p>
        Toute demande de remboursement doit être accompagnée d’un justificatif d’identité et bancaire. En cas de documents manquants, la demande est refusée jusqu’à réception complète des pièces.
    </p>

    <p class="mt-8 text-sm text-muted-foreground">
        Pour toute question, merci de contacter : <a href="mailto:contact@touffurs.org">contact@touffurs.org</a>
    </p>
</div>