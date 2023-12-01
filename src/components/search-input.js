import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/search-icon.css'




function SearchInput({
    option,
    text,
    handleOption,
    placeHolder,
    setText,
    selected,
    OtherStyle = { name: 'sna', color: '#FFFFFF', icon: 'faMagnifyingGlass' } }) {

    // select custom
    const options = option.map((v) => ({ label: v, value: v }));
    const selectStyles = {
        control: (provided) => ({
            ...provided,
            height: '40px',
            fontSize: '18px',
            background: 'var(--Threecolor)',
            border: 'none',
            borderRadius: '8px',
            padding: 'auto',
            boxShadow: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            paddingRight: '15px'
        }),
        option: (provided, option) => ({
            ...provided,
            color: option.isSelected ? OtherStyle.color : 'normal',
            background: 'var(--Threecolor)',
            fontWeight: option.isSelected ? '600' : 'normal'
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            display: 'none',
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
        }),
        menu: (provided) => ({
            ...provided,
            marginTop: '15px',
        }),
        menuList: (provided) => ({
            ...provided,
            paddingBlock: "0",
            '::-webkit-scrollbar': {
                width: '0',
            }
        }),
        singleValue: provided => ({
            ...provided,
            color: OtherStyle.color
        }),
        container: provided => ({
            ...provided,
            width: "100%"
        }),
    };

    return (
        <>
            <div className={`${OtherStyle.name}-search`}>
                <Select
                    // 修正過的表單(縣市)
                    options={options}
                    // 現在值為和(縣市)
                    value={text ? options.find((opt) => opt.value === text) : ''}
                    // 這裡為選定的時後產生
                    onChange={(e) => {
                        if (OtherStyle.name === 'area') {
                            handleOption(e.value, setText);
                            handleOption(e.value, selected);
                        } else {
                            const value = [e.value]
                            handleOption(value, setText);
                            handleOption(value, selected);
                        }
                    }}
                    styles={selectStyles}
                    placeholder={placeHolder}
                    onInputChange={(value) => {
                        if (value) {
                            const oneOption = options.filter((opt) =>
                                opt.label.includes(value)
                            );
                            if (OtherStyle.name === 'area') {
                                if (oneOption[0]) {
                                    selected(oneOption[0].value);
                                }
                            }
                            else {
                                const seacrhlist = [...new Set(oneOption.map(v => v.value))]
                                selected(seacrhlist)
                            }
                        } else {
                            selected(text)
                        }
                    }}
                />
                <FontAwesomeIcon icon={OtherStyle.icon}
                    className={OtherStyle.name === "area" ? text ? 'icon icon-checked-black' : 'icon icon-default-color'
                        : text ? 'icon icon-checked-green' : 'icon icon-default-color'}
                />
            </div>
        </>
    );
}

export default SearchInput;
