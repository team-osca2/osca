const form = document.getElementById('form'),
    $cafeBusinessNumber = $('#cafeBusinessNumber'),
    $cafeName = $('#cafeName'),
    $cafeContactEmail = $('#cafeContactEmail'),
    $cafeContactPhonenumber = $('#cafeContactPhonenumber'),
    $cafeOpenTime = $('#cafeOpenTime'),
    $cafeEndTime = $('#cafeEndTime'),
    $address = $('#address'),
    $addressDetail = $('#address_detail'),
    $cafeLocation = $('#cafeLocation');

const checkCafeBusinessNumber = () => (/\d{3}-\d{2}-\d{5}/).test($cafeBusinessNumber.val()),
    checkCafeName = () => $cafeName.val().trim() !== '',
    checkCafeContactEmail = () => (/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i).test($cafeContactEmail.val()),
    checkCafeContactPhonenumber = () => (/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/).test($cafeContactPhonenumber.val()),
    checkCafeOpenTime = () => $cafeOpenTime.val() !== '',
    checkCafeEndTime = () => $cafeEndTime.val() !== '',
    checkAddressCheck = () => $address.val().trim() !== '',
    checkAddressDetailCheck = () => $addressDetail.val().trim() !== '';

const
    inputList = [$cafeBusinessNumber, $cafeName, $cafeContactEmail, $cafeContactPhonenumber, $cafeOpenTime,
        $cafeEndTime, $address, $addressDetail];
    checkList = [checkCafeBusinessNumber, checkCafeName, checkCafeContactEmail, checkCafeContactPhonenumber, checkCafeOpenTime,
    checkCafeEndTime, checkAddressCheck, checkAddressDetailCheck];

$('.save-button').on('click', function () {
    let flag = true;
    checkList.some((check, idx) => {
        if(!check()){
            inputList[idx].focus();
            flag =  false;
            return true;
        }
    })
    if(!flag){return;}
    $cafeLocation.val($address.val()+ ", " + $addressDetail.val());
    form.action = "/cafe/write";
    form.method = "POST";
    form.submit();
})