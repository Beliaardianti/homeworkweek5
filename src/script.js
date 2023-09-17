class Pendaftar {
    constructor (nama, umur, uang){
        this.nama = nama;
        this.umur = umur;
        this.uang = uang;

    }
}

const registrasiForm = document.querySelector('#registrationForm');
const pendaftarList = [];

// fungsi button submit form 
function submitForm() {
    const nama = document.getElementById('nama').value;
    const umur = parseInt(document.getElementById('umur').value);
    const uang = parseInt(document.getElementById('uang').value);

// Validasi Data 
if (isValidData(nama, umur, uang)) {
    const pendaftar = new Pendaftar (nama, umur, uang);
    pendaftarList.push(pendaftar);
    Swal.fire({
        title: 'Sukses!',
        text: 'Data pendaftar berhasil disimpan.',
        icon: 'success'
    });
    registrasiForm.reset();

    // menampilkan data pendaftar 
    tampilkanListPendaftar();

    // menghitung ratarata umur dan uang sangu 
    hitungRataRata();

    // menampilkan resume 
    tampilkanResume();
} else {
    Swal.fire({
        title: 'Kesalahan!',
        text: 'Data tidak valid. Periksa kembali isian Anda.',
        icon: 'error'
    });
}
}

// validasi data 
function isValidData(nama, umur, uang) {
    if (nama.length < 10) {
        alert("Nama harus memiliki minimal 10 karakter.");
        return false;
    }
    if (umur < 25) {
        alert("Umur harus minimal 25 tahun.");
        return false;
    }
    if (uang < 100000 || uang > 1000000) {
        alert("Uang saku antara 100 ribu dan 1 juta.");
        return false;
    }
    return true;
}

// menghitung rata rata 
function hitungRataRata(){
    let totalUmur = 0;
    let totalUang = 0;

    pendaftarList.forEach((pendaftar) => {
        totalUmur += pendaftar.umur;
        totalUang += pendaftar.uang;
    });

    const rataRataUmur = Math.floor (totalUmur / pendaftarList.length);
    const rataRataUang = Math.floor (totalUang / pendaftarList.length);

    return {rataRataUmur, rataRataUang};
}

// menampilkan list pendaftar 
function tampilkanListPendaftar(){
    const pendaftarData = document.getElementById('pendaftarData');
    pendaftarData.innerHTML = '';

    let nomorUrut = 1; 

    pendaftarList.forEach((pendaftar) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="border px-4 py-2 text-center whitespace-nowrap">${nomorUrut}</td>
        <td class="border px-4 py-2 text-center whitespace-nowrap">${pendaftar.nama}</td>
        <td class="border px-4 py-2 text-center whitespace-nowrap">${pendaftar.umur}</td>
        <td class="border px-4 py-2 text-center whitespace-nowrap">${pendaftar.uang}</td>
        `;

        pendaftarData.appendChild(row);
        nomorUrut++;
    });

}

// membuat format rupiah 
function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    return formatter.format(angka);
}

// menampilkan resume 
function tampilkanResume() {
    const { rataRataUmur, rataRataUang } = hitungRataRata();
    const resume = document.getElementById('resume');
    
    const rupiahUang = formatRupiah(rataRataUang);
    
    resume.textContent = `Rata-rata pendaftar memiliki uang sangu sebesar ${rupiahUang} dengan rata-rata umur ${rataRataUmur}`;
} 

function openTab(tabName) {
    const tabcontent = document.getElementsByClassName('tab-content');
    for (const tab of tabcontent) {
        tab.style.display = 'none';
    }

    const tablinks = document.getElementsByClassName('tab-btn');
    for (const tablink of tablinks) {
        tablink.classList.remove('active');
    }

    document.getElementById(tabName).style.display = 'block';
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
};

    
    
    document.getElementById(tabName).style.display = 'block';
    
   
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
 
    
    // Tampilan tab Registrasi saat halaman dimuat
    openTab('Registrasi');
