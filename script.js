// مصفوفة لتخزين البطاقات المتعددة
let cardsList = [];
let currentIndex = 0;
let uploadedAvatarBase64 = null;

// معاينة الصورة عند الرفع
function previewImage(event) {
    const file = event.target.files[0];
    const label = document.getElementById('fileLabel');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedAvatarBase64 = e.target.result;
            label.innerHTML = `<i class="fa-solid fa-check"></i> تم اختيار الصورة بنجاح`;
            label.style.borderColor = '#e6c594';
            label.style.color = '#e6c594';
        };
        reader.readAsDataURL(file);
    }
}

// إضافة بطاقة جديدة وحفظها
function generateCard(e) {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const age = document.getElementById('userAge').value.trim();
    const job = document.getElementById('userJob').value.trim();
    
    const avatar = uploadedAvatarBase64 || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

    // إدراج البطاقة الجديدة في المصفوفة
    cardsList.push({ name, age, job, avatar });
    currentIndex = cardsList.length - 1; // التوجه للبطاقة الجديدة المضافة

    // تحديث وتفريغ نموذج الإدخال
    document.getElementById('profileForm').reset();
    uploadedAvatarBase64 = null;
    document.getElementById('fileLabel').innerHTML = `<i class="fa-solid fa-image"></i> اختر صورة شخصية (اختياري)`;

    // عرض البطاقات
    renderCurrentCard();

    // التبديل إلى واجهة البطاقة
    document.getElementById('stepForm').classList.remove('active');
    setTimeout(() => {
        document.getElementById('stepCard').classList.add('active');
    }, 200);
}

// عرض بيانات البطاقة الحالية
function renderCurrentCard() {
    if (cardsList.length === 0) return;

    const currentCard = cardsList[currentIndex];
    document.getElementById('cardName').innerText = currentCard.name;
    document.getElementById('cardAge').innerText = currentCard.age + " سنة";
    document.getElementById('cardJob').innerText = currentCard.job;
    document.getElementById('cardAvatar').src = currentCard.avatar;

    // تحديث عداد البطاقات
    document.getElementById('cardCounter').innerText = `بطاقة ${currentIndex + 1} من ${cardsList.length}`;
}

// التنقل للبطاقة السابقة
function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        renderCurrentCard();
    }
}

// التنقل للبطاقة التالية
function nextCard() {
    if (currentIndex < cardsList.length - 1) {
        currentIndex++;
        renderCurrentCard();
    }
}

// إضافة بطاقة جديدة (الرجوع لصفحة الترحيب والإدخال)
function addNewCardMode() {
    goBack();
}

// زر العودة للرئيسية
function goBack() {
    document.getElementById('stepCard').classList.remove('active');
    setTimeout(() => {
        document.getElementById('stepForm').classList.add('active');
    }, 200);
}