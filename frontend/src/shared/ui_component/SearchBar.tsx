import {
	FC,
	useState,
	useRef
} from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface Product {
	id: number;
	nombre: string;
}

interface SearchBarProps {
	placeholder: string;
	className?: string;
}

export const SearchBar: FC<SearchBarProps> = ( { placeholder } ) => {
	const [ inputValue, setInputValue ]       = useState<string>( '' )
	const [ searchResults, setSearchResults ] = useState<Product[]>( [] )
	const [ isFocused, setIsFocused ]         = useState<boolean>( false )

	const [ inSuggestion, setInSuggestion ]                     = useState<boolean>(
		false )
	const [ indexSuggestedSelected, setIndexSuggestedSelected ] = useState<number>(
		0 )
	const inputRef                                              = useRef<HTMLInputElement>(
		null )


	const fetchData = ( value: string ) => {

		fetch( `https://test-products-json-default-rtdb.firebaseio.com/.json` )
			.then( ( response ) => response.json() )
			.then( ( data ) => {
				const filteredData: Product[] = data.filter( ( item: Product ) => {
					return item?.nombre?.toLowerCase()
					           .includes( value.toLowerCase() )
				} )
				setSearchResults( filteredData )
			} )
	}

	addEventListener( 'keydown', ( e ) => {
		if ( e.key === 'ArrowDown' ) {
			if ( inSuggestion ) {
				setIndexSuggestedSelected( ( prevState ) => prevState + 1 )
			}
			console.log( indexSuggestedSelected )
			console.log( 'Down' )
		}
		else if ( e.key === 'ArrowUp' ) {
			if ( inSuggestion ) {
				if ( indexSuggestedSelected < 0 ) {
					setInSuggestion( false )
					setIsFocused( true )
					setIndexSuggestedSelected( 0 )
					inputRef.current?.focus()
					return
				}
				setIndexSuggestedSelected( ( prevState ) => prevState - 1 )
			}
			console.log( indexSuggestedSelected )
			console.log( 'Up' )
		}
	} )

  const debounced = useDebouncedCallback(
    () => {
	    console.log("pre")
      fetchData(inputValue)
	    console.log("post")
    },
    800
  );
	const handleChange = ( value: string ) => {
		setInputValue( value )
	}

	const handleFocus = () => {
		setIsFocused( true )
	}

	const handleBlur = () => {
		setIsFocused( false )
	}

	return (
		<>
			<div>
				<div className="flex">
					<input
						ref={ inputRef }
						onKeyDown={ ( e ) => {
							if ( e.key === 'ArrowDown' && isFocused ) {
								inputRef.current?.blur()
								setInSuggestion( true )
								setIsFocused( false )
								console.log( 'Down Input' )
							}
						} }
						type="text"
						className="bg-white h-10 font-semibold text-sm px-3 rounded-l-sm border-2 border-white focus:outline-none w-full"
						placeholder={ placeholder }
						value={ inputValue }
						onChange={ ( e ) => {
              handleChange( e.target.value )
              debounced()
            } }
						onFocus={ handleFocus }
						onBlur={ handleBlur }
					/>
					<button className="bg-primary-400 border-2 border-primary-400 px-5 rounded-r-sm">
						<div className="text-white">
							<svg
								viewBox="0 0 1024 1024"
								fill="currentColor"
								height="1.5em"
								width="1.5em"
							>
								<path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"/>
							</svg>
						</div>
					</button>
				</div>
				<div
					className={ `bg-white mt-2 overflow-y-scroll h-80 rounded-lg ${ searchResults.length > 0
						? ''
						: 'hidden' }` }
				>
					{ searchResults.map( ( product, i ) => (
						<a className={ `block p-1 ${ indexSuggestedSelected === i
							? 'bg-blue-500'
							: '' }` }
							key={ product.id }
							href="">
							{ product.nombre }
						</a>
					) ) }
				</div>
			</div>
		</>
	)
}
